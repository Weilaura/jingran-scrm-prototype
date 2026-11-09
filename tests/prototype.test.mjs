import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ROUTES, ROLES, PREVIEW_DATA } from '../dist/contracts.js';
import { activateRoute, createState, project, reduce, buildExport, resolveRoute, selectTargets } from '../dist/projection.js';
import { renderShell, renderModal } from '../dist/views.js';

const customer = { id: 'customer-self', name: '客户甲', owner: 'self', grade: '待确认', province: '', school: '', account: '', tags: [] };
const other = { ...customer, id: 'customer-other', name: '客户乙', owner: 'other' };
const ready = () => createState({ role: 'sales', customers: [customer, other] });
const order = { type: 'saveOrder', requestId: 'order-request', payload: { customerId: customer.id, product: '用户填写产品', amount: '100' } };

test('contract routes retire chat and approvals and include every agreed capability', () => {
  const routes = new Set(ROUTES.map(route => route.id));
  ['customers', 'messages', 'groups', 'followups', 'welcome', 'records', 'transactions', 'statistics', 'materials', 'phrases', 'export'].forEach(route => assert.ok(routes.has(route), route));
  assert.equal(routes.has('chat'), false);
  assert.equal(routes.has('approvals'), false);
  assert.equal(routes.has('dashboard'), false);
  assert.equal(resolveRoute('sales', 'settings'), 'customers');
  assert.equal(resolveRoute('sales', 'chat'), 'customers');
  assert.equal(resolveRoute('admin', 'dashboard'), 'customers');
  assert.equal(ROLES.supervisor.scope, 'team');
});

test('scope is resolved once and applied to customers, records, summaries and exports', () => {
  const state = reduce(ready(), order);
  const result = project(state);
  assert.deepEqual(result.customers.map(item => item.id), [customer.id]);
  assert.equal(result.orders.length, 1);
  assert.equal(buildExport(result, 'orders').rows.length, 1);
  const supervisor = project({ ...state, role: 'supervisor', teamOwners: [] });
  assert.equal(supervisor.scope.status, 'pending');
  assert.equal(supervisor.customers.length, 0);
  assert.equal(supervisor.orders.length, 0);
  assert.equal(project({ ...state, role: 'admin' }).orders.length, 0);
  assert.equal(buildExport(result, 'customers').status, 'blocked');
});

test('order commands validate access and amount, coalesce duplicates and keep accepted data on failure', () => {
  const accepted = reduce(ready(), order);
  assert.equal(accepted.orders.length, 1);
  assert.equal(reduce(accepted, order).orders.length, 1);
  const denied = reduce(accepted, { ...order, requestId: 'other', payload: { ...order.payload, customerId: other.id } });
  assert.equal(denied.result.status, 'error');
  assert.deepEqual(denied.orders, accepted.orders);
  assert.equal(reduce(accepted, { ...order, requestId: 'bad', payload: { ...order.payload, amount: 'NaN' } }).orders.length, 1);
});

test('cancel does not mutate data and a corrected retry can succeed', () => {
  const state = ready();
  assert.equal(reduce(state, { type: 'cancel' }), state);
  const failed = reduce(state, { ...order, payload: { ...order.payload, amount: '-2' } });
  const retried = reduce(failed, order);
  assert.equal(retried.orders.length, 1);
  assert.equal(retried.result.status, 'success');
});

test('record types and next visit are retained without inventing automatic follow-up rules', () => {
  const state = reduce(ready(), { type: 'saveRecord', requestId: 'record', payload: { customerId: customer.id, kind: 'consultation', content: '用户输入', nextVisit: '2026-11-10' } });
  assert.equal(project(state).records[0].nextVisit, '2026-11-10');
  assert.equal(project(state).followup.status, 'pending');
  assert.deepEqual(project(state).followup.tasks, []);
});

test('unverified sending has no invented draft or success transition', () => {
  const state = reduce(ready(), { type: 'saveTask', requestId: 'task', payload: { targetIds: [customer.id], targetKind: 'customers', contentKind: 'text', content: '用户输入消息' } });
  assert.equal(state.tasks.length, 0);
  assert.equal(state.result.status, 'blocked');
  const blocked = reduce(state, { type: 'submitTask', requestId: 'submit', payload: {} });
  assert.equal(blocked.result.status, 'blocked');
  assert.equal(blocked.tasks.length, 0);
});

test('refunds and statistics do not silently adopt an unconfirmed accounting rule', () => {
  const state = reduce(ready(), order);
  assert.equal(project(state).performance.status, 'pending');
  const refund = reduce(state, { type: 'saveRefund', requestId: 'refund', payload: { orderId: state.orders[0].id, amount: '10' } });
  assert.equal(refund.result.status, 'blocked');
  assert.equal(refund.refunds.length, 0);
  assert.equal(buildExport(project(state), 'performance').status, 'blocked');
});

test('personal phrases update by identity and cannot mutate another owner', () => {
  let state = reduce(ready(), { type: 'savePhrase', requestId: 'phrase', payload: { title: '问候', content: '用户话术' } });
  const id = state.phrases[0].id;
  state = reduce(state, { type: 'savePhrase', requestId: 'edit', payload: { id, title: '问候', content: '更新内容' } });
  assert.equal(state.phrases.length, 1);
  assert.equal(state.phrases[0].content, '更新内容');
  const denied = reduce(state, { type: 'deletePhrase', requestId: 'delete-other', payload: { id: 'missing' } });
  assert.equal(denied.result.status, 'error');
  assert.equal(denied.phrases.length, 1);
});

test('cross-tag selection retains identities across filters, coalesces repeats and rejects out-of-scope targets', () => {
  const second = { ...customer, id: 'customer-second', name: '客户丙', tags: ['另一标签'] };
  let state = createState({ role: 'sales', customers: [customer, second, other] });
  state = selectTargets(state, { ids: [customer.id], selected: true });
  state = { ...state, filters: { ...state.filters, tag: '另一标签' } };
  assert.ok(project(state).tagOptions.includes('另一标签'));
  state = selectTargets(state, { ids: [second.id, other.id], selected: true });
  state = selectTargets(state, { ids: [second.id], selected: true });
  assert.deepEqual([...state.targetIds], [customer.id, second.id]);
  state = selectTargets(state, { ids: [customer.id], selected: false });
  assert.deepEqual([...state.targetIds], [second.id]);
});

test('tag filter options remain available when the current result only contains another tag', () => {
  const a = { ...customer, tags: ['标签甲'] };
  const b = { ...customer, id: 'second', tags: ['标签乙'] };
  const state = createState({ role: 'sales', customers: [a, b], filters: { query: '', tag: '标签甲', start: '', end: '', recordKind: '' } });
  assert.deepEqual(project(state).tagOptions, ['标签甲', '标签乙']);
});

test('group selection cannot silently save customer targets as a group task', () => {
  const state = reduce(ready(), { type: 'saveTask', requestId: 'group', payload: { targetKind: 'groups', targetIds: [customer.id], contentKind: 'text', content: '消息' } });
  assert.equal(state.tasks.length, 0);
  assert.equal(state.result.status, 'blocked');
});

test('unknown scope differs from a confirmed empty scope without overview counters', () => {
  const unknown = project(createState({ role: 'supervisor' }));
  assert.equal(unknown.scope.status, 'pending');
  const empty = project(createState({ role: 'supervisor', teamScopeStatus: 'ready', teamOwners: [] }));
  assert.equal(empty.scope.status, 'ready');
  assert.equal(empty.customers.length, 0);
  assert.equal('metrics' in unknown, false);
});

test('all permitted routes and modal forms render without executable user content', () => {
  const state = ready();
  state.customers[0] = { ...customer, name: '<img src=x onerror=alert(1)>' };
  Object.entries(ROLES).forEach(([role, policy]) => {
    const projection = project({ ...state, role });
    policy.routes.forEach(route => assert.ok(renderShell(route, projection).includes('<main')));
  });
  const projection = project(state);
  ['order', 'refund', 'record', 'phrase', 'customer'].forEach(type => assert.ok(renderModal(type, projection, customer.id).includes('role="dialog"')));
  assert.ok(!renderShell('customers', projection).includes('<img src=x'));
});

test('date filtering uses the local timezone and includes the local end date', () => {
  const state = reduce(ready(), { ...order, createdAt: '2026-11-09T16:10:00Z' });
  const filtered = project({ ...state, filters: { ...state.filters, start: '2026-11-10', end: '2026-11-10' } });
  assert.equal(filtered.orders.length, 1);
  assert.equal(filtered.orders[0].createdDate, '2026-11-10');
});

test('attachments and links cannot create simulated provider tasks', () => {
  const base = { type: 'saveTask', requestId: 'attachment', payload: { targetKind: 'customers', targetIds: [customer.id], contentKind: 'file', content: '', attachment: { name: '用户文件.pdf', size: 12, type: 'application/pdf' } } };
  const state = reduce(ready(), base);
  assert.equal(state.tasks.length, 0);
  assert.equal(state.result.status, 'blocked');
  const bad = reduce(ready(), { ...base, payload: { ...base.payload, contentKind: 'link', content: 'javascript:alert(1)' } });
  assert.equal(bad.tasks.length, 0);
});

test('navigation isolates hidden filters while transaction export retains its query', () => {
  let state = activateRoute(ready(), 'transactions');
  state = { ...state, filters: { ...state.filters, query: '产品' } };
  assert.equal(activateRoute(state, 'export').filters.query, '产品');
  state = activateRoute(state, 'messages');
  state = { ...state, filters: { ...state.filters, tag: '新客户' } };
  assert.equal(activateRoute(state, 'customers').filters.tag, '');
});

test('next-visit updates patch one customer and preserve records and existing attributes', () => {
  const state = reduce(ready(), { type: 'saveNextVisit', requestId: 'next', payload: { customerId: customer.id, nextVisit: '2026-11-11' } });
  assert.equal(state.customers[0].nextVisit, '2026-11-11');
  assert.deepEqual(state.customers[0].tags, customer.tags);
  assert.deepEqual(state.customers[1], other);
});

test('prepared action and navigation projections do not expose unavailable role shortcuts', () => {
  const supervisor = project(createState({ role: 'supervisor' }));
  assert.equal(supervisor.actions.saveOrder.enabled, false);
  const sales = project(ready());
  assert.equal(sales.actions.saveOrder.enabled, true);
  assert.equal(sales.actions.saveRefund.enabled, false);
  assert.equal(sales.actions.submitTask.enabled, false);
  assert.equal(sales.actions.saveMaterial.enabled, false);
});

test('first paint has no invented customer data, workbench, or linear sending workflow', () => {
  assert.deepEqual(createState().customers, []);
  const projection = project(ready());
  const pages = ROUTES.map(route => renderShell(route.id, project(createState()))).join('');
  ['工作台', '保存草稿', '发送草稿', '{昵称}', 'flow-strip', 'data-preview-welcome', 'data-copy=', 'data-tags='].forEach(text => assert.equal(pages.includes(text), false, text));
  assert.equal(renderShell('messages', projection).includes('data-form="saveTask"'), false);
  ['跨标签全选', '停止待发'].forEach(text => assert.ok(renderShell('messages', projection).includes(text)));
  ['隔日', '7天', '14天'].forEach(text => assert.ok(renderShell('followups', projection).includes(text)));
  assert.ok(renderShell('groups', projection).includes('批量改名'));
  assert.ok(renderShell('customers', projection).includes('最早添加员工'));
});

test('unconfirmed tag writeback and welcome sending cannot claim a local success', () => {
  ['saveTags', 'saveWelcome'].forEach(type => {
    const state = reduce(ready(), { type, requestId: type, payload: { customerId: customer.id, tags: ['用户填写'], content: '用户填写' } });
    assert.equal(state.result.status, 'blocked');
    assert.deepEqual(state.customers, ready().customers);
    assert.equal(state.welcome, '');
  });
});

test('preview data links only fictional customers, orders and records within the existing scope', () => {
  const state = createState(structuredClone(PREVIEW_DATA));
  const data = project(state);
  assert.equal(state.role, 'sales');
  assert.equal(data.customers.length, 5);
  assert.equal(data.orders.length, 3);
  assert.equal(data.records.length, 4);
  assert.equal(data.groups.length, 2);
  assert.equal(data.phrases.length, 2);
  const customers = new Map(data.customers.map(row => [row.id, row]));
  [...data.orders, ...data.records].forEach(row => {
    assert.equal(row.customer, customers.get(row.customerId)?.name);
    assert.equal(row.owner, customers.get(row.customerId)?.owner);
    assert.ok(row.content?.includes('演示') || row.product?.includes('演示'));
  });
  data.customers.forEach(row => assert.ok(row.name.startsWith('演示客户')));
  const groups = renderShell('groups', data);
  data.groups.forEach(row => assert.ok(groups.includes(row.name)));
  assert.ok(renderShell('customers', data).includes('全部为演示假数据'));
  assert.ok(renderShell('welcome', data).includes('演示客户甲'));
  assert.ok(!data.welcome.includes('{昵称}'));
});

test('preview fixtures do not enable provider commands or introduce extra pages', () => {
  const data = project(createState(structuredClone(PREVIEW_DATA)));
  assert.deepEqual(ROUTES.map(route => route.id), ['customers', 'messages', 'groups', 'followups', 'welcome', 'records', 'transactions', 'statistics', 'materials', 'phrases', 'export', 'settings']);
  assert.deepEqual(data.tasks, []);
  assert.deepEqual(data.refunds, []);
  assert.equal(data.performance.status, 'pending');
  assert.deepEqual(data.followup.tasks, []);
  ['submitTask', 'stopTask', 'renameGroups', 'saveWelcome', 'saveRefund'].forEach(type => assert.equal(data.actions[type].enabled, false));
  assert.equal(project(createState({ ...structuredClone(PREVIEW_DATA), role: 'admin' })).customers.length, 0);
  assert.equal(project(createState({ ...structuredClone(PREVIEW_DATA), role: 'supervisor' })).customers.length, 0);
});

test('editing preview records keeps the initial fixtures intact for refresh', () => {
  const initial = structuredClone(PREVIEW_DATA);
  const state = createState(structuredClone(PREVIEW_DATA));
  const saved = reduce(state, { type: 'saveNextVisit', requestId: 'demo-change', payload: { customerId: state.customers[0].id, nextVisit: '2026-11-15' } });
  assert.equal(saved.customers[0].nextVisit, '2026-11-15');
  assert.deepEqual(PREVIEW_DATA, initial);
  assert.equal(createState(structuredClone(PREVIEW_DATA)).customers[0].nextVisit, '2026-11-10');
  assert.equal(buildExport(project(state), 'orders').rows.length, 3);
});
