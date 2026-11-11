import { COMMAND_POLICY, CONSULTATION_EXPORT_FIELDS, CUSTOMER_EXPORT_FIELDS, CUSTOMERS, DIMENSIONS, EXPORTS, FILTER_CONTEXTS, PAYMENT_EXPORT_FIELDS, PERFORMANCE_EXPORT_FIELDS, PENDING, RECORD_KINDS, REFUND_EXPORT_FIELDS, ROLES, ROUTES, SELECTION_ACTIONS, TARGET_COLLECTIONS, TEXT, WEEKLY_INTENT_EXPORT_FIELDS } from './contracts.js?v=20261111-doc-update';

const blankFilters = () => ({ query: '', start: '', end: '', month: '2026-11', recordKind: '', tag: '', tags: [], account: '', project: '', owner: '', source: '', grade: '', school: '', province: '' });

/** @param {object} input Normalized local preview snapshot; never a provider payload. */
export const createState = (input = {}) => ({
  role: 'admin', actorId: 'self', teamScopeStatus: 'ready', teamOwners: ['self'],
  customers: CUSTOMERS.map(item => ({ ...item, tags: [...item.tags] })), accounts: [], conversations: [],
  orders: [], refunds: [], records: [], tasks: [], groups: [], phrases: [], welcome: '',
  filters: blankFilters(), targetIds: new Set(), targetKind: 'customers', contentKind: 'text', taskDraft: { content: '', attachment: null },
  filterContext: 'customers', filterContexts: new Map(), accepted: new Map(), result: { status: 'idle', message: '' }, ...input
});

const SCOPES = {
  all: state => ({ status: 'ready', owners: new Set(state.customers.map(row => row.owner)), message: ROLES.admin.scopeLabel }),
  self: state => ({ status: 'ready', owners: new Set([state.actorId]), message: ROLES.sales.scopeLabel }),
  team: state => ({ status: state.teamScopeStatus, owners: new Set(state.teamScopeStatus === 'ready' ? state.teamOwners : []), message: ROLES.supervisor.scopeLabel })
};
export const resolveScope = state => (SCOPES[ROLES[state.role]?.scope] ?? SCOPES.self)(state);
export const resolveRoute = (role, route) => ROLES[role]?.routes.includes(route) ? route : (ROLES[role]?.routes[0] ?? 'dashboard');
const owns = (scope, row) => scope.owners.has(row.owner);
const textMatch = (row, query) => !query || Object.values(row).flat().join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase());
const localDate = value => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value));
const dateMatch = (row, filters, key = 'createdAt') => (!filters.start || localDate(row[key]) >= filters.start) && (!filters.end || localDate(row[key]) <= filters.end);
const customerFilter = (row, filters) => textMatch(row, filters.query)
  && (!filters.tag || row.tags.includes(filters.tag))
  && (!(filters.tags ?? []).length || filters.tags.every(tag => tag === '__untagged__' ? row.tags.length === 0 : row.tags.includes(tag)))
  && (!filters.account || row.accountId === filters.account)
  && (!filters.owner || row.ownerName === filters.owner)
  && (!filters.source || row.source === filters.source)
  && dateMatch(row, filters, 'addedAt');
const scopedRows = (rows, scope, filters) => rows.filter(row => owns(scope, row) && dateMatch(row, filters) && textMatch(row, filters.query)).map(row => ({ ...row, createdDate: localDate(row.createdAt) }));
const summary = (rows, key) => [...Map.groupBy(rows, row => row[key] || TEXT.pending)].map(([value, entries]) => ({ value, count: entries.length }));
const exportStatus = { records: scope => scope.status, pending: () => 'pending' };
const availability = {
  customer: context => context.scope.status === 'ready' && context.customers.length > 0,
  order: context => context.scope.status === 'ready' && context.orders.length > 0,
  personal: () => true,
  pending: () => false
};

const projectSummary = (orders, refunds = []) => [...Map.groupBy(orders, row => row.project || row.product)].map(([project, rows]) => ({
  project, count: rows.length, amount: rows.reduce((sum, row) => sum + Number(row.amount || 0), 0),
  refund: refunds.filter(refund => rows.some(order => order.id === refund.orderId)).reduce((sum, row) => sum + Number(row.amount || 0), 0)
}));

const amount = rows => rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
const shiftDate = (date, days) => {
  const value = new Date(`${date}T00:00:00+08:00`);
  value.setUTCDate(value.getUTCDate() + days);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(value);
};
const paymentRows = (orders, customers) => orders.map(order => {
  const customer = customers.find(row => row.id === order.customerId) ?? {};
  return [
    customer.grade, order.classType || '—', order.package || order.product, order.subcategory || order.project,
    customer.wechat, order.customer, order.createdDate || localDate(order.createdAt), Number(order.amount || 0), order.paymentType || '—',
    customer.account, customer.addedAt ? localDate(customer.addedAt) : '—', customer.school, customer.province,
    order.orderType || '新签', order.customerOwner, order.referralTeacher || '—', order.regionBatch || '—', order.channel,
    order.contractStatus, order.ownershipStatus || '已归属', order.arrivalStatus || '已到账', customer.source, order.enteredBy || order.customerOwner
  ];
});

/** Resolve scope once; all pages, counters and exports consume this projection. */
export const project = state => {
  const scope = resolveScope(state);
  const allCustomers = state.customers.filter(row => owns(scope, row));
  const customers = allCustomers.filter(row => customerFilter(row, state.filters));
  const linkedCustomer = customerId => allCustomers.find(row => row.id === customerId);
  const orders = scopedRows(state.orders, scope, state.filters).filter(row => {
    const customer = linkedCustomer(row.customerId);
    return (!state.filters.project || row.project === state.filters.project)
      && (!state.filters.account || customer?.accountId === state.filters.account)
      && (!state.filters.owner || row.customerOwner === state.filters.owner)
      && (!state.filters.source || customer?.source === state.filters.source)
      && (!state.filters.grade || customer?.grade === state.filters.grade)
      && (!state.filters.school || customer?.school === state.filters.school)
      && (!state.filters.province || customer?.province === state.filters.province);
  });
  const records = scopedRows(state.records, scope, state.filters).filter(row => {
    const customer = linkedCustomer(row.customerId);
    return (!state.filters.recordKind || row.kind === state.filters.recordKind)
      && (!state.filters.project || row.project.includes(state.filters.project))
      && (!state.filters.account || customer?.accountId === state.filters.account)
      && (!state.filters.owner || row.recordedByName === state.filters.owner)
      && (!state.filters.source || customer?.source === state.filters.source);
  });
  const tasks = scopedRows(state.tasks, scope, state.filters);
  const routes = ROUTES.filter(item => ROLES[state.role].routes.includes(item.id));
  const visibleOrderIds = new Set(orders.map(row => row.id));
  const refunds = scopedRows(state.refunds, scope, state.filters).filter(row => visibleOrderIds.has(row.orderId));
  const groups = state.groups.filter(row => owns(scope, row));
  const projectPerformance = projectSummary(orders, refunds).map(row => ({ ...row, net: row.amount - row.refund }));
  const total = amount(orders);
  const refundTotal = refunds.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const dealtIds = new Set(orders.map(row => row.customerId));
  const dashboardMonth = state.filters.month || '2026-11';
  const dashboardOrders = state.orders.filter(row => owns(scope, row)).map(row => ({ ...row, createdDate: localDate(row.createdAt) }));
  const monthOrders = dashboardOrders.filter(row => row.createdDate.startsWith(dashboardMonth));
  const confirmedMonthOrders = monthOrders.filter(row => (row.arrivalStatus || '已到账') === '已到账');
  const pendingMonthOrders = monthOrders.filter(row => (row.arrivalStatus || '已到账') !== '已到账');
  const previousMonth = dashboardMonth === '2026-01' ? `${Number(dashboardMonth.slice(0, 4)) - 1}-12` : `${dashboardMonth.slice(0, 4)}-${String(Number(dashboardMonth.slice(5)) - 1).padStart(2, '0')}`;
  const previousMonthTotal = amount(dashboardOrders.filter(row => row.createdDate.startsWith(previousMonth) && (row.arrivalStatus || '已到账') === '已到账'));
  const referenceDate = dashboardMonth === '2026-11' ? '2026-11-10' : `${dashboardMonth}-28`;
  const referenceDay = new Date(`${referenceDate}T00:00:00+08:00`).getDay() || 7;
  const weekStart = shiftDate(referenceDate, 1 - referenceDay);
  const weekEnd = shiftDate(weekStart, 6);
  const confirmedOrders = dashboardOrders.filter(row => (row.arrivalStatus || '已到账') === '已到账');
  const todayTotal = amount(confirmedOrders.filter(row => row.createdDate === referenceDate));
  const weekTotal = amount(confirmedOrders.filter(row => row.createdDate >= weekStart && row.createdDate <= weekEnd));
  const monthTotal = amount(confirmedMonthOrders);
  const yearTotal = amount(confirmedOrders.filter(row => row.createdDate.startsWith(dashboardMonth.slice(0, 4))));
  const monthRefunds = state.refunds.filter(row => owns(scope, row) && localDate(row.createdAt).startsWith(dashboardMonth));
  const monthlyRefundTotal = amount(monthRefunds);
  const target = 160000;
  const targetRate = Math.round(monthTotal / Math.max(target, 1) * 1000) / 10;
  const roster = state.role === 'sales' ? ['刘芸'] : ['刘芸', '莎莎', '双燕', '小迪'];
  const salesRows = roster.map((name, index) => {
    const rows = confirmedMonthOrders.filter(row => row.customerOwner === name);
    const rowRefunds = monthRefunds.filter(refund => monthOrders.some(order => order.id === refund.orderId && order.customerOwner === name));
    const rowTarget = index === 0 ? target : 0;
    const performance = amount(rows);
    return { name, performance, orders: rows.length, people: new Set(rows.map(row => row.customerId)).size, target: rowTarget, completion: rowTarget ? Math.round(performance / rowTarget * 1000) / 10 : null, refund: amount(rowRefunds) };
  });
  const weekTrend = Array.from({ length: 7 }, (_, index) => {
    const date = shiftDate(referenceDate, index - 6);
    return { date, label: date.slice(5).replace('-', '/'), amount: amount(confirmedOrders.filter(row => row.createdDate === date)) };
  });
  const exportPreview = { headers: PAYMENT_EXPORT_FIELDS, rows: paymentRows(orders, allCustomers) };
  const consultationRecords = records.filter(row => row.kind === 'consultation');
  const weeklyIntentCustomers = allCustomers.filter(row => row.stage !== '已成交' && row.nextVisit >= weekStart && row.nextVisit <= weekEnd);
  const exportDatasets = {
    weeklyIntent: {
      headers: WEEKLY_INTENT_EXPORT_FIELDS,
      rows: weeklyIntentCustomers.map(customer => {
        const latest = consultationRecords.filter(row => row.customerId === customer.id).sort((a, b) => b.createdDate.localeCompare(a.createdDate))[0];
        return [customer.name, customer.wechat, customer.stage, customer.tags.join('、'), latest?.project || '—', latest?.content || '—', customer.ownerName, customer.account, customer.nextVisit, customer.phone];
      }),
      suffix: `${weekStart}_${weekEnd}`,
      rangeLabel: `本周 ${weekStart.slice(5).replace('-', '/')}—${weekEnd.slice(5).replace('-', '/')}`
    },
    consultations: {
      headers: CONSULTATION_EXPORT_FIELDS,
      rows: consultationRecords.map(row => {
        const customer = linkedCustomer(row.customerId) ?? {};
        return [row.customer, customer.wechat || '—', row.project, row.content, RECORD_KINDS[row.kind], row.recordedByName, row.createdDate, row.nextVisit || '—', customer.account || '—', (customer.tags || []).join('、')];
      }),
      suffix: dashboardMonth,
      rangeLabel: `${dashboardMonth.replace('-', '年')}月`
    },
    payments: { ...exportPreview, suffix: dashboardMonth, rangeLabel: `${dashboardMonth.replace('-', '年')}月` },
    performance: {
      headers: PERFORMANCE_EXPORT_FIELDS,
      rows: salesRows.map(row => [row.name, row.orders, row.people, row.performance, row.target || 0, row.completion === null ? '未设置' : `${row.completion}%`, row.refund]),
      suffix: dashboardMonth,
      rangeLabel: `${dashboardMonth.replace('-', '年')}月`
    },
    refunds: {
      headers: REFUND_EXPORT_FIELDS,
      rows: refunds.map(row => [row.id, row.customer, row.orderId, row.amount, row.reason, row.status, row.createdDate]),
      suffix: dashboardMonth,
      rangeLabel: `${dashboardMonth.replace('-', '年')}月`
    },
    customers: {
      headers: CUSTOMER_EXPORT_FIELDS,
      rows: allCustomers.map(row => [row.name, row.wechat, row.phone, row.grade, row.school, row.province, row.source, row.account, row.ownerName, localDate(row.addedAt)]),
      suffix: dashboardMonth,
      rangeLabel: `${dashboardMonth.replace('-', '年')}月`
    }
  };
  return {
    role: state.role, scope, filters: state.filters, customers, allCustomers, orders, records, routes, accounts: state.accounts,
    conversations: state.conversations.filter(row => allCustomers.some(customer => customer.id === row.customerId)),
    actions: Object.fromEntries(Object.entries(COMMAND_POLICY).map(([type, policy]) => [type, { enabled: availability[policy]({ scope, customers: allCustomers, orders }) }])),
    recordQueries: Object.fromEntries(Object.keys(RECORD_KINDS).map(kind => [kind, records.filter(row => row.kind === kind)])),
    refunds, tasks, phrases: state.phrases.filter(row => row.owner === state.actorId), groups,
    projectCatalog: state.projectCatalog ?? [], productCatalog: state.productCatalog ?? [],
    welcome: state.welcome, result: state.result, targetKind: state.targetKind, contentKind: state.contentKind, targetIds: state.targetIds, taskDraft: state.taskDraft,
    tagOptions: [...new Set(allCustomers.flatMap(row => row.tags))], targets: { customers, groups }[state.targetKind] ?? [],
    followup: { status: 'ready', message: PENDING.followup, tasks: allCustomers.filter(row => row.nextVisit) },
    performance: { status: 'ready', total, refundTotal, net: total - refundTotal, conversion: customers.length ? Math.round(dealtIds.size / customers.length * 1000) / 10 : 0, projects: projectPerformance },
    dashboard: {
      status: 'ready', month: dashboardMonth, referenceDate, monthTotal, previousMonthTotal, confirmedCount: confirmedMonthOrders.length,
      target, targetRate, people: new Set(confirmedMonthOrders.map(row => row.customerId)).size,
      pendingAmount: amount(pendingMonthOrders), pendingCount: pendingMonthOrders.length, refundTotal: monthlyRefundTotal, refundCount: monthRefunds.length,
      periods: { today: todayTotal, week: weekTotal, month: monthTotal, year: yearTotal }, salesRows, weekTrend, message: PENDING.performance
    },
    exportPreview, exportDatasets,
    projectPerformance, projectOptions: [...new Set(state.orders.filter(row => owns(scope, row)).map(row => row.project))], ownerOptions: [...new Set(allCustomers.map(row => row.ownerName))], sourceOptions: [...new Set(allCustomers.map(row => row.source))],
    gradeOptions: [...new Set(allCustomers.map(row => row.grade))], schoolOptions: [...new Set(allCustomers.map(row => row.school))], provinceOptions: [...new Set(allCustomers.map(row => row.province))],
    dimensions: DIMENSIONS.map(item => ({ ...item, entries: summary(allCustomers, item.key), status: 'ready' })),
    exports: Object.entries(EXPORTS).filter(([, item]) => item.roles.includes(state.role)).map(([id, item]) => ({ id, ...item, status: exportStatus[item.policy](scope) }))
  };
};

export const selectTargets = (state, { ids, selected }) => {
  const scope = resolveScope(state);
  const allowed = new Set((state[TARGET_COLLECTIONS[state.targetKind]] ?? []).filter(row => owns(scope, row)).map(row => row.id));
  const targetIds = new Set([...state.targetIds].filter(id => allowed.has(id)));
  ids.filter(id => allowed.has(id)).forEach(id => targetIds[SELECTION_ACTIONS[String(selected)]](id));
  return { ...state, targetIds };
};

export const activateRoute = (state, route) => {
  const filterContexts = new Map(state.filterContexts).set(state.filterContext, { ...state.filters });
  const filterContext = FILTER_CONTEXTS[route] ?? route;
  const filters = filterContexts.get(filterContext) ?? blankFilters();
  return { ...state, filterContexts, filterContext, filters, result: { status: 'idle', message: '' } };
};

const outcome = (state, status, message) => ({ ...state, result: { status, message } });
const fail = (state, message = TEXT.invalid) => outcome(state, 'error', message);
const decision = (status, extra = {}) => ({ status, ...extra });
const validCustomer = (state, payload) => state.customers.find(item => item.id === payload.customerId && resolveScope(state).owners.has(item.owner))
  ?? (payload.customerId === 'manual' && payload.manualCustomer?.trim() ? { id: `manual-${payload.manualCustomer.trim()}`, name: payload.manualCustomer.trim(), owner: state.actorId, ownerName: TEXT.currentActor, grade: payload.grade || '未填写', province: payload.province || '未填写', school: payload.school || '未填写' } : null);
const validOrder = (state, payload) => state.orders.find(item => item.id === payload.orderId && resolveScope(state).owners.has(item.owner));
const PERMISSIONS = {
  customer: (state, payload) => decision('ready', { customer: validCustomer(state, payload) }),
  order: (state, payload) => decision('ready', { order: validOrder(state, payload) }),
  personal: state => decision('ready', { owner: state.actorId }),
  pending: () => decision('blocked', { message: TEXT.unavailable })
};
const accepted = (state, command, patch) => ({
  ...state, ...patch, accepted: new Map(state.accepted).set(command.requestId, command.type), result: { status: 'success', message: TEXT.localSaved }
});
const baseRow = (state, command) => ({ id: command.requestId, owner: state.actorId, createdAt: command.createdAt ?? new Date().toISOString() });
const money = value => Number(value);

const saveOrder = (state, command, resolved) => {
  const { payload } = command;
  if (!resolved.customer) return fail(state, TEXT.denied);
  if (!payload.product?.trim() || !Number.isFinite(money(payload.amount)) || money(payload.amount) <= 0) return fail(state);
  const row = {
    ...baseRow(state, command), customerId: resolved.customer.id, customer: resolved.customer.name,
    customerOwner: resolved.customer.ownerName ?? resolved.customer.owner, project: payload.project?.trim() || '未分类项目',
    product: payload.product.trim(), amount: money(payload.amount), owner: resolved.customer.owner,
    channel: ({ wecom: '企业微信收款', bank: '银行转账', other: '其他' })[payload.channel] || payload.channel || '未填写',
    contractStatus: '待补录', arrivalStatus: '待确认', reviewStatus: '待财务/管理员确认',
    grade: payload.grade || resolved.customer.grade || '未填写', province: payload.province || resolved.customer.province || '未填写', school: payload.school || resolved.customer.school || '未填写',
    proofName: payload.attachment?.name || '未上传'
  };
  return accepted(state, command, { orders: [row, ...state.orders] });
};
const saveRecord = (state, command, resolved) => {
  const { payload } = command;
  if (!resolved.customer) return fail(state, TEXT.denied);
  if (!RECORD_KINDS[payload.kind] || !payload.content?.trim()) return fail(state);
  if (payload.nextVisit && !/^\d{4}-\d{2}-\d{2}$/.test(payload.nextVisit)) return fail(state);
  const previous = payload.id ? state.records.find(item => item.id === payload.id && item.customerId === resolved.customer.id) : null;
  const row = {
    ...baseRow(state, command), ...previous, id: previous?.id || command.requestId, recordedBy: state.actorId, recordedByName: TEXT.currentActor, customerId: resolved.customer.id,
    customer: resolved.customer.name, kind: payload.kind, project: payload.project?.trim() || '未填写项目', content: payload.content.trim(),
    intentLevel: payload.intentLevel || '中', grade: payload.grade || resolved.customer.grade || '未填写', nextVisit: payload.nextVisit ?? '', owner: resolved.customer.owner
  };
  const updatedCustomer = { ...resolved.customer, nextVisit: payload.nextVisit || resolved.customer.nextVisit || '' };
  return accepted(state, command, { records: [row, ...state.records.filter(item => item.id !== row.id)], customers: state.customers.map(item => item.id === updatedCustomer.id ? updatedCustomer : item) });
};
const saveRefund = (state, command, resolved) => {
  const { payload } = command;
  if (!resolved.order) return fail(state, TEXT.denied);
  if (!Number.isFinite(money(payload.amount)) || money(payload.amount) <= 0 || money(payload.amount) > resolved.order.amount) return fail(state);
  const row = { ...baseRow(state, command), orderId: resolved.order.id, customer: resolved.order.customer, amount: money(payload.amount), reason: payload.reason?.trim() || '未填写', status: '审批中', owner: resolved.order.owner };
  return accepted(state, command, { refunds: [row, ...state.refunds] });
};
const savePhrase = (state, command) => {
  const { payload } = command;
  if (!payload.title?.trim() || !payload.content?.trim()) return fail(state);
  if (payload.id && !state.phrases.some(row => row.id === payload.id && row.owner === state.actorId)) return fail(state, TEXT.denied);
  const previous = state.phrases.find(item => item.id === payload.id) ?? {};
  const row = { ...baseRow(state, command), ...previous, id: payload.id || command.requestId, title: payload.title.trim(), content: payload.content.trim() };
  return accepted(state, command, { phrases: [...state.phrases.filter(item => item.id !== row.id), row] });
};
const deletePhrase = (state, command) => {
  if (!state.phrases.some(row => row.id === command.payload.id && row.owner === state.actorId)) return fail(state, TEXT.denied);
  return accepted(state, command, { phrases: state.phrases.filter(row => row.id !== command.payload.id) });
};
const saveNextVisit = (state, command, resolved) => {
  if (!resolved.customer) return fail(state, TEXT.denied);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(command.payload.nextVisit ?? '')) return fail(state);
  const customer = { ...resolved.customer, nextVisit: command.payload.nextVisit };
  return accepted(state, command, { customers: state.customers.map(row => row.id === customer.id ? customer : row) });
};
const saveTags = (state, command, resolved) => {
  if (!resolved.customer) return fail(state, TEXT.denied);
  const tags = [...new Set((command.payload.tags ?? []).map(tag => tag.trim()).filter(Boolean))];
  const customer = { ...resolved.customer, tags };
  return accepted(state, command, { customers: state.customers.map(row => row.id === customer.id ? customer : row) });
};
const COMMANDS = { saveOrder, saveRecord, saveRefund, savePhrase, deletePhrase, saveNextVisit, saveTags };
const RESOLUTIONS = {
  ready: (state, command, resolved) => COMMANDS[command.type](state, command, resolved),
  blocked: (state, command) => outcome(state, 'blocked', new Map([
    ['saveTask', PENDING.provider], ['submitTask', PENDING.provider], ['stopTask', PENDING.provider], ['saveWelcome', PENDING.welcome],
    ['renameGroups', PENDING.groups], ['generateFollowups', PENDING.followup], ['saveMaterial', PENDING.materials]
  ]).get(command.type) ?? TEXT.unavailable)
};

export const reduce = (state, command) => {
  if (command?.type === 'cancel') return state;
  if (!command?.requestId || !COMMAND_POLICY[command.type] || !command.payload) return fail(state);
  if (state.accepted.has(command.requestId)) return state;
  const resolved = PERMISSIONS[COMMAND_POLICY[command.type]](state, command.payload);
  return RESOLUTIONS[resolved.status](state, command, resolved);
};

export const buildExport = (projection, kind) => {
  const definition = EXPORTS[kind];
  const dataset = projection.exportDatasets?.[kind];
  if (!definition || !dataset) return { status: 'blocked', message: PENDING.exports, headers: [], rows: [] };
  return { status: 'ready', title: `${definition.title}-${dataset.suffix}`, exportLabel: definition.title, scopeLabel: dataset.rangeLabel, headers: dataset.headers, rows: dataset.rows };
};
