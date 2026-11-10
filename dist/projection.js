import { COMMAND_POLICY, CUSTOMERS, DIMENSIONS, EXPORTS, FILTER_CONTEXTS, PENDING, RECORD_KINDS, ROLES, ROUTES, SELECTION_ACTIONS, TARGET_COLLECTIONS, TEXT } from './contracts.js';

const blankFilters = () => ({ query: '', start: '', end: '', recordKind: '', tag: '', account: '' });

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
  && (!filters.account || row.accountId === filters.account)
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

const projectSummary = orders => [...Map.groupBy(orders, row => row.project || row.product)].map(([project, rows]) => ({
  project, count: rows.length, amount: rows.reduce((sum, row) => sum + Number(row.amount || 0), 0)
}));

/** Resolve scope once; all pages, counters and exports consume this projection. */
export const project = state => {
  const scope = resolveScope(state);
  const allCustomers = state.customers.filter(row => owns(scope, row));
  const customers = allCustomers.filter(row => customerFilter(row, state.filters));
  const orders = scopedRows(state.orders, scope, state.filters);
  const records = scopedRows(state.records, scope, state.filters).filter(row => !state.filters.recordKind || row.kind === state.filters.recordKind);
  const tasks = scopedRows(state.tasks, scope, state.filters);
  const routes = ROUTES.filter(item => ROLES[state.role].routes.includes(item.id));
  const refunds = scopedRows(state.refunds, scope, state.filters);
  const groups = state.groups.filter(row => owns(scope, row));
  const projectPerformance = projectSummary(orders);
  return {
    role: state.role, scope, filters: state.filters, customers, allCustomers, orders, records, routes, accounts: state.accounts,
    conversations: state.conversations.filter(row => allCustomers.some(customer => customer.id === row.customerId)),
    actions: Object.fromEntries(Object.entries(COMMAND_POLICY).map(([type, policy]) => [type, { enabled: availability[policy]({ scope, customers: allCustomers, orders }) }])),
    recordQueries: Object.fromEntries(Object.keys(RECORD_KINDS).map(kind => [kind, records.filter(row => row.kind === kind)])),
    refunds, tasks, phrases: state.phrases.filter(row => row.owner === state.actorId), groups,
    welcome: state.welcome, result: state.result, targetKind: state.targetKind, contentKind: state.contentKind, targetIds: state.targetIds, taskDraft: state.taskDraft,
    tagOptions: [...new Set(allCustomers.flatMap(row => row.tags))], targets: { customers, groups }[state.targetKind] ?? [],
    followup: { status: 'ready', message: PENDING.followup, tasks: allCustomers.filter(row => row.nextVisit) },
    performance: { status: 'ready', total: orders.reduce((sum, row) => sum + Number(row.amount || 0), 0), projects: projectPerformance },
    projectPerformance,
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
const validCustomer = (state, payload) => state.customers.find(item => item.id === payload.customerId && resolveScope(state).owners.has(item.owner));
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
    contractStatus: '待补录', proofName: payload.attachment?.name || '未上传'
  };
  return accepted(state, command, { orders: [row, ...state.orders] });
};
const saveRecord = (state, command, resolved) => {
  const { payload } = command;
  if (!resolved.customer) return fail(state, TEXT.denied);
  if (!RECORD_KINDS[payload.kind] || !payload.content?.trim()) return fail(state);
  if (payload.nextVisit && !/^\d{4}-\d{2}-\d{2}$/.test(payload.nextVisit)) return fail(state);
  const row = {
    ...baseRow(state, command), recordedBy: state.actorId, recordedByName: TEXT.currentActor, customerId: resolved.customer.id,
    customer: resolved.customer.name, kind: payload.kind, project: payload.project?.trim() || '未填写项目', content: payload.content.trim(),
    nextVisit: payload.nextVisit ?? '', owner: resolved.customer.owner
  };
  const updatedCustomer = { ...resolved.customer, nextVisit: payload.nextVisit || resolved.customer.nextVisit || '' };
  return accepted(state, command, { records: [row, ...state.records], customers: state.customers.map(item => item.id === updatedCustomer.id ? updatedCustomer : item) });
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
  const contract = projection.exports.find(item => item.id === kind);
  if (!contract || contract.status !== 'ready') return { status: 'blocked', message: PENDING.exports, headers: [], rows: [] };
  if (kind === 'performance') return { status: 'ready', title: contract.title, headers: contract.headers, rows: projection.projectPerformance.map(row => [row.project, row.count, row.amount]) };
  return { status: 'ready', title: contract.title, headers: contract.headers, rows: projection.orders.map(row => [row.customer, row.project, row.amount, row.customerOwner, row.createdAt]) };
};
