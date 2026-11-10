import test from 'node:test';
import assert from 'node:assert/strict';
import { PREVIEW_DATA, ROLES, ROUTES } from '../dist/contracts.js';
import { buildExport, createState, project, reduce, resolveRoute } from '../dist/projection.js';
import { renderModal, renderShell } from '../dist/views.js';

const fresh = () => createState(structuredClone(PREVIEW_DATA));
const ui = { activeConversationId: 'conv-zhou', pinnedConversationIds: new Set(['conv-zhou']), activeAccountId: 'acc-02', chatTab: 'all', composerText: '', exportHistory: [] };

test('navigation exposes the detailed SCRM workbench requested by the product owner', () => {
  const ids = ROUTES.map(row => row.id);
  ['dashboard', 'chat', 'customers', 'followups', 'records', 'transactions', 'messages', 'groups', 'statistics', 'settings'].forEach(id => assert.ok(ids.includes(id), id));
  assert.equal(ROUTES.find(row => row.id === 'followups').sub, true);
  assert.equal(ROUTES.find(row => row.id === 'records').sub, true);
  assert.equal(resolveRoute('sales', 'settings'), 'dashboard');
  assert.equal(resolveRoute('admin', 'settings'), 'settings');
});

test('customer search covers all authorized work accounts and filters by account, tag and add date', () => {
  const base = fresh();
  const all = project(base);
  assert.equal(all.allCustomers.length, PREVIEW_DATA.customers.length);
  assert.equal(new Set(all.allCustomers.map(row => row.accountId)).size, 2);
  const html = renderShell('customers', { ...all, ui });
  assert.ok(html.includes('>查看</button>'));
  assert.equal(/<button[^>]*>筛选<\/button>/.test(html), false);
  const filtered = project({ ...base, filters: { ...base.filters, account: 'acc-03', tag: '重点跟进', start: '2026-11-01', end: '2026-11-10' } });
  assert.deepEqual(filtered.customers.map(row => row.name), ['陈一诺家长']);
});

test('dashboard aggregates project deal count and amount', () => {
  const view = project(fresh());
  assert.equal(view.projectPerformance.length, 2);
  assert.equal(view.performance.total, 32580);
  const gaokao = view.projectPerformance.find(row => row.project === '2027届高考项目');
  assert.deepEqual({ count: gaokao.count, amount: gaokao.amount }, { count: 2, amount: 25600 });
});

test('sales dashboard follows the meeting video metrics, scope and settlement rules', () => {
  const data = project({ ...fresh(), role: 'sales' });
  assert.equal(data.dashboard.status, 'ready');
  assert.equal(data.dashboard.monthTotal, 25600);
  assert.equal(data.dashboard.pendingAmount, 6980);
  assert.equal(data.dashboard.refundTotal, 1000);
  assert.deepEqual(data.dashboard.periods, { today: 0, week: 16800, month: 25600, year: 25600 });
  assert.deepEqual(data.dashboard.salesRows.map(row => row.name), ['刘芸']);
  const html = renderShell('dashboard', { ...data, ui });
  ['本月业绩', '个人目标完成率', '成交人数', '待确认 / 当月退费', '当天业绩', '本周业绩', '本年业绩', '按销售', '本周业绩曲线'].forEach(label => assert.ok(html.includes(label), label));
  ['客户转化漏斗', '来源分布', '新增客户数'].forEach(label => assert.equal(html.includes(label), false, label));
  const admin = project(fresh());
  assert.deepEqual(admin.dashboard.salesRows.map(row => row.name), ['刘芸', '莎莎', '双燕', '小迪']);
  assert.ok(renderShell('dashboard', { ...admin, ui }).includes('设置月度目标'));
});

test('data export provides six business exports including weekly intentions and one-click consultations', () => {
  const data = project(fresh());
  assert.deepEqual(data.exports.map(row => row.id), ['weeklyIntent', 'consultations', 'payments', 'performance', 'refunds', 'customers']);
  const intent = buildExport(data, 'weeklyIntent');
  assert.equal(intent.status, 'ready');
  assert.equal(intent.rows.length, 3);
  assert.deepEqual(intent.headers.slice(0, 4), ['客户', '微信昵称', '意向阶段', '意向标签']);
  const consultations = buildExport(data, 'consultations');
  assert.equal(consultations.status, 'ready');
  assert.equal(consultations.rows.length, 2);
  assert.deepEqual(consultations.headers.slice(0, 4), ['客户', '微信昵称', '咨询项目', '咨询内容']);
  const exported = buildExport(data, 'payments');
  assert.equal(exported.status, 'ready');
  assert.equal(exported.headers.length, 23);
  assert.deepEqual(exported.headers.slice(0, 8), ['年级', '班型', '套餐', '子类', '微信昵称', '学员', '付款日期', '金额（元）']);
  assert.deepEqual(exported.headers.slice(-6), ['收款方式', '合同', '归属状态', '到账状态', '来源', '录入人']);
  assert.equal(exported.rows.length, 3);
  const html = renderShell('export', { ...data, ui });
  ['本周意向客户', '咨询记录', '成交与收款明细', '销售业绩汇总', '退费与作废明细', '客户添加记录', '最近导出', '导出记录'].forEach(label => assert.ok(html.includes(label), label));
  const recordsHtml = renderShell('records', { ...data, ui });
  assert.ok(recordsHtml.includes('data-export="consultations"'));
});

test('deal entry retains project, screenshot and post-deal contract status', () => {
  const state = fresh();
  const next = reduce(state, { type: 'saveOrder', requestId: 'new-order', createdAt: '2026-11-10T01:00:00Z', payload: { customerId: 'customer-chen', project: '国际课程项目', product: '雅思强化班', amount: '12800', attachment: { name: '成交截图.png' } } });
  assert.equal(next.result.status, 'success');
  assert.deepEqual({ project: next.orders[0].project, proof: next.orders[0].proofName, contract: next.orders[0].contractStatus }, { project: '国际课程项目', proof: '成交截图.png', contract: '待补录' });
});

test('consultation records retain consultation project, content and next visit', () => {
  const state = fresh();
  const next = reduce(state, { type: 'saveRecord', requestId: 'new-record', createdAt: '2026-11-10T02:00:00Z', payload: { customerId: 'customer-yuan', kind: 'consultation', project: '高二数学提升', content: '咨询班型与开课时间', nextVisit: '2026-11-14' } });
  assert.equal(next.result.status, 'success');
  assert.equal(next.records[0].project, '高二数学提升');
  assert.equal(next.records[0].content, '咨询班型与开课时间');
  assert.equal(next.customers.find(row => row.id === 'customer-yuan').nextVisit, '2026-11-14');
});

test('refund applications must link an order and cannot exceed the deal amount', () => {
  const state = fresh();
  const ok = reduce(state, { type: 'saveRefund', requestId: 'refund-ok', createdAt: '2026-11-10T03:00:00Z', payload: { orderId: 'CJ202611090018', amount: '2800', reason: '课程调整' } });
  assert.equal(ok.result.status, 'success');
  assert.equal(ok.refunds[0].orderId, 'CJ202611090018');
  assert.equal(ok.refunds[0].status, '审批中');
  const invalid = reduce(state, { type: 'saveRefund', requestId: 'refund-bad', payload: { orderId: 'CJ202611090018', amount: '99999', reason: '测试' } });
  assert.equal(invalid.result.status, 'error');
});

test('tag editing preserves a unique customer tag list', () => {
  const state = fresh();
  const next = reduce(state, { type: 'saveTags', requestId: 'tag-save', payload: { customerId: 'customer-zhou', tags: ['重要客户', '已成交', '重要客户'] } });
  assert.equal(next.result.status, 'success');
  assert.deepEqual(next.customers.find(row => row.id === 'customer-zhou').tags, ['重要客户', '已成交']);
});

test('all role routes render and the chat page includes every key workbench interaction', () => {
  for (const role of Object.keys(ROLES)) {
    const state = { ...fresh(), role };
    const data = project(state);
    for (const route of data.routes) {
      const html = renderShell(route.id, { ...data, ui });
      assert.match(html, /高保真交互原型/);
      assert.doesNotMatch(html, /undefined/);
    }
  }
  const data = project(fresh());
  const chat = renderShell('chat', { ...data, ui });
  ['会话接入容量', '快捷回复', 'data-toggle-pin', '所在群聊', '回访设置', '录入成交', '交接流程'].forEach(label => assert.ok(chat.includes(label), label));
  const groupChat = renderShell('chat', { ...data, ui: { ...ui, activeConversationId: 'conv-group', activeAccountId: 'acc-admin' } });
  assert.ok(groupChat.includes('@所有人'));
  assert.ok(groupChat.includes('本次回复身份'));
});

test('chat tabs filter all, unanswered and group conversations', () => {
  const data = project(fresh());
  const renderTab = (chatTab, activeConversationId = 'conv-zhou') => renderShell('chat', { ...data, ui: { ...ui, chatTab, activeConversationId } });
  assert.equal((renderTab('all').match(/data-conversation=/g) ?? []).length, 5);
  assert.equal((renderTab('unread').match(/data-conversation=/g) ?? []).length, 3);
  const group = renderTab('group', 'conv-group');
  assert.equal((group.match(/data-conversation=/g) ?? []).length, 1);
  assert.ok(group.includes('data-chat-tab="group"'));
  assert.ok(group.includes('aria-selected="true" data-chat-tab="group"'));
});

test('customer, deal, follow-up, group-send and settings pages expose requested details', () => {
  const data = project(fresh());
  const pages = {
    customers: ['添加开始日期', '企微账号', '标签人数及明细', '企微原标签会保留'],
    followups: ['今日应回访', '未来 7 天', '逾期未回访'],
    records: ['咨询项目', '咨询内容'],
    transactions: ['成交截图', '后补合同', '申请退费'],
    messages: ['群发管理', '新建群发任务'],
    statistics: ['项目成交总数和金额', '成交金额'],
    settings: ['保留企业微信原有标签', '每日增量同步']
  };
  for (const [route, labels] of Object.entries(pages)) {
    const html = renderShell(route, { ...data, ui });
    labels.forEach(label => assert.ok(html.includes(label), `${route}: ${label}`));
  }
});

test('all requested click flows have concrete modal content', () => {
  const data = { ...project(fresh()), ui };
  const cases = {
    sessionCapacity: '2,000 个活跃会话', quickReply: '使用此回复', mentionAll: '确认使用管理员账号 @所有人',
    followup: '下次回访日期', handover: '原销售收到通知', order: '成交记录截图', refund: '提交退费申请',
    contract: '支持后置上传', proof: '成交记录截图', broadcast: '正式发送前需员工', tagDetail: '标签人数明细',
    tagManage: '原企微标签不会被删除', groupAccount: '管理员账号', tagSync: '保留并去重', projectDetail: '归属销售', targetSetting: '月度目标（元）'
  };
  const ids = { followup: 'customer-zhou', handover: 'customer-zhou', order: 'customer-zhou', refund: 'CJ202611090018', contract: 'CJ202611090018', proof: 'CJ202611090018', tagDetail: '已成交', tagManage: 'customer-zhou', projectDetail: '2027届高考项目' };
  for (const [type, expected] of Object.entries(cases)) {
    const html = renderModal(type, data, ids[type] ?? '');
    assert.ok(html.includes(expected), `${type}: ${expected}`);
    assert.match(html, /role="dialog"/);
  }
});

test('rendering escapes executable customer and phrase content', () => {
  const state = fresh();
  state.customers[0] = { ...state.customers[0], name: '<img src=x onerror=alert(1)>' };
  state.phrases[0] = { ...state.phrases[0], content: '<script>alert(1)</script>' };
  const data = project(state);
  const customerHtml = renderShell('customers', { ...data, ui });
  const phraseHtml = renderModal('quickReply', { ...data, ui });
  assert.ok(customerHtml.includes('&lt;img'));
  assert.ok(phraseHtml.includes('&lt;script&gt;'));
  assert.doesNotMatch(customerHtml, /<img src=x/);
  assert.doesNotMatch(phraseHtml, /<script>alert/);
});

test('creating a state never mutates the refresh fixtures', () => {
  const state = fresh();
  const original = PREVIEW_DATA.customers.find(row => row.id === 'customer-zhou').nextVisit;
  const next = reduce(state, { type: 'saveNextVisit', requestId: 'visit-change', payload: { customerId: 'customer-zhou', nextVisit: '2026-12-01' } });
  assert.equal(next.customers.find(row => row.id === 'customer-zhou').nextVisit, '2026-12-01');
  assert.equal(PREVIEW_DATA.customers.find(row => row.id === 'customer-zhou').nextVisit, original);
});
