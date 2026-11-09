import { CONTENT_INPUTS, CONTENT_KINDS, DIMENSIONS, FOLLOWUP_RULES, PENDING, PLACEHOLDERS, RECORD_KINDS, ROLES, ROUTES, TARGET_KINDS, TEXT } from './contracts.js';

// Preserve the existing escaping boundary and tag-picker interaction in its customer owner view.
export const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const e = escapeHtml;
const ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  deal: '<path d="M20 7h-4V3H8v4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M8 7h8M12 11v6M9 14h6"/>',
  export: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06L7.04 4.3l.06.06A1.65 1.65 0 0 0 8.92 4a1.65 1.65 0 0 0 1-1.51V2h4v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9c.12.61.66 1.05 1.28 1.05H21v4h-.32c-.62 0-1.16.44-1.28 1.05z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
};
const icon = name => `<span class="nav-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] ?? ICONS.file}</svg></span>`;
const opt = (value, label, selected) => `<option value="${e(value)}" ${new Map([[true, 'selected'], [false, '']]).get(value === selected)}>${e(label)}</option>`;
const options = (items, selected) => Object.entries(items).map(([value, label]) => opt(value, label, selected)).join('');
const button = (label, attributes = '', primary = false) => `<button class="btn ${new Map([[true, 'btn-primary'], [false, '']]).get(primary)}" ${attributes}>${e(label)}</button>`;
const disabled = (data, type) => new Map([[true, ''], [false, 'disabled']]).get(data.actions[type]?.enabled ?? false);
const pending = message => `<div class="pending-note"><span class="status status-wait">${e(TEXT.pending)}</span><span>${e(message)}</span></div>`;
const note = message => `<p class="section-note">${e(message)}</p>`;
const card = (title, body, action = '') => `<section class="card section-card"><div class="card-head"><div class="card-title">${e(title)}</div>${action}</div><div class="card-body">${body}</div></section>`;
const table = (headers, rows, empty = TEXT.empty) => `<div class="table-scroll"><table class="data-table"><thead><tr>${headers.map(label => `<th>${e(label)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td>${value?.html ?? e(value)}</td>`).join('')}</tr>`).join('')}<tr ${new Map([[true, 'hidden'], [false, '']]).get(rows.length > 0)}><td class="empty-cell" colspan="${headers.length}">${e(empty)}</td></tr></tbody></table></div>`;
const field = (label, control, wide = false) => `<div class="form-field ${new Map([[true, 'full'], [false, '']]).get(wide)}">${control.replace('data-label', `aria-label="${e(label)}"`)}<span class="field-label">${e(label)}</span></div>`;
const input = (name, label, value = '', type = 'text', extra = '', placeholder = PLACEHOLDERS[name] ?? '') => field(label, `<input data-label name="${name}" type="${type}" value="${e(value)}" placeholder="${e(placeholder)}" ${extra}>`);
const textarea = (name, label, value = '', extra = '', placeholder = PLACEHOLDERS[name] ?? '') => field(label, `<textarea data-label name="${name}" placeholder="${e(placeholder)}" ${extra}>${e(value)}</textarea>`, true);
const select = (name, label, items, selected = '') => field(label, `<select data-label name="${name}">${options(items, selected)}</select>`);
const customerSelect = data => select('customerId', TEXT.customer, Object.fromEntries(data.customers.map(row => [row.id, row.name])));
const form = (type, fields, enabled = true, label = TEXT.save) => `<form data-form="${type}"><div class="form-grid">${fields}</div><div class="form-actions"><span>${e(TEXT.localOnly)}</span><div>${button(label, `type="submit" ${new Map([[true, ''], [false, 'disabled']]).get(enabled)}`, true)}</div></div></form>`;
const filterBar = data => `<form class="toolbar" data-filter><div class="filters">${input('query', TEXT.search, data.filters.query)}${input('start', TEXT.start, data.filters.start, 'date')}${input('end', TEXT.end, data.filters.end, 'date')}</div><div class="filter-actions">${button(TEXT.reset, 'type="button" data-reset-filter')}${button(TEXT.search, 'type="submit"', true)}</div></form>`;
const orderRows = data => data.orders.map(row => [row.id, row.customer, row.product, row.amount, row.customerOwner, row.createdDate]);
const recordRows = data => data.records.map(row => [row.customer, RECORD_KINDS[row.kind], row.content, row.recordedByName, row.createdDate, row.nextVisit || TEXT.pending]);
const customerRows = data => data.customers.map(row => [{ html: `<button class="link-btn" data-customer="${e(row.id)}">${e(row.name)}</button>` }, row.ownerName ?? row.owner, row.grade, row.province, row.school, row.account, row.tags.join('、')]);
const scopeNote = data => new Map([[true, ''], [false, pending(data.scope.message)]]).get(data.scope.status === 'ready');

export const customersView = data => `${filterBar(data)}${pending(PENDING.customer)}
${card(TEXT.customer, table([TEXT.customerName, TEXT.owner, ...DIMENSIONS.map(item => item.label), TEXT.tags], customerRows(data), TEXT.noCustomers))}
<div class="two-column">${card(TEXT.sync, `<div class="status-grid">${TEXT.syncTypes.map(label => `<div><strong>${e(label)}</strong><p>${e(TEXT.noSync)}</p></div>`).join('')}</div>${pending(PENDING.provider)}`)}
${card(TEXT.duplicate, `${note(PENDING.duplicate)}${table([TEXT.customer, TEXT.firstRelation, TEXT.taskStatus], [], TEXT.firstRelationPending)}`)}</div>
${card(`${TEXT.batch} / ${TEXT.groupClass}`, table([TEXT.customer, TEXT.batch, TEXT.groupClass], data.customers.map(row => [row.name, TEXT.pending, TEXT.pending])))}`;

export const customerDetail = (data, id) => {
  const customer = data.customers.find(row => row.id === id);
  if (!customer) return pending(TEXT.denied);
  const rows = data.records.filter(row => row.customerId === id);
  const orders = data.orders.filter(row => row.customerId === id);
  return `<div class="detail-grid"><div>${card(customer.name, `${table([TEXT.customerId, TEXT.owner], [[customer.id, customer.ownerName ?? customer.owner]])}${note(TEXT.sourcePending)}${table(DIMENSIONS.map(item => item.label), [DIMENSIONS.map(item => customer[item.key] || TEXT.pending)])}`)}
  ${card(TEXT.tags, `<div class="tags">${customer.tags.map(tag => `<span class="tag">${e(tag)}</span>`).join('')}</div>${pending(TEXT.tagPending)}`)}</div>
  ${card(TEXT.nextVisit, form('saveNextVisit', `<input type="hidden" name="customerId" value="${e(id)}">${input('nextVisit', TEXT.nextVisit, customer.nextVisit ?? '', 'date', 'required')}`))}
  <div>${card(TEXT.orderList, table([TEXT.product, TEXT.amount, TEXT.date], orders.map(row => [row.product, row.amount, row.createdDate])))}
  ${card(TEXT.firstRelation, `${note(TEXT.firstRelationPending)}${pending(PENDING.retention)}`)}
  ${card(TEXT.recordCount, table([TEXT.recordKind, TEXT.content, TEXT.nextVisit], rows.map(row => [RECORD_KINDS[row.kind], row.content, row.nextVisit || TEXT.pending])))}</div></div>`;
};

export const transactionsView = data => `${filterBar(data)}${pending(PENDING.orders)}
${card(TEXT.orderList, table([TEXT.orderId, TEXT.customer, TEXT.product, TEXT.amount, TEXT.owner, TEXT.date], orderRows(data)), button(TEXT.addOrder, 'data-modal="order"', true))}
${card(TEXT.refundList, `${note(TEXT.refundAssociation)}${pending(PENDING.refunds)}${table([TEXT.originalOrder, TEXT.refundAmount, TEXT.refundDate], data.refunds.map(row => [row.orderId, row.amount, row.createdAt]))}`, button(TEXT.addRefund, 'data-modal="refund"'))}`;

export const dealFormView = data => `${note(PENDING.orders)}${form('saveOrder', `${customerSelect(data)}${input('product', TEXT.product, '', 'text', 'required')}${input('amount', TEXT.amount, '', 'number', 'required min="0.01" step="0.01"')}`, data.actions.saveOrder.enabled)}`;
const refundForm = data => `${pending(PENDING.refunds)}${form('saveRefund', `${select('orderId', TEXT.originalOrder, Object.fromEntries(data.orders.map(row => [row.id, `${row.customer} / ${row.product}`])))}${input('amount', TEXT.refundAmount, '', 'number', '', PLACEHOLDERS.refundAmount)}`, data.actions.saveRefund.enabled)}`;

export const recordsView = data => `${filterBar(data)}${pending(PENDING.records)}${card(TEXT.recordCount,
  `<form data-kind-filter class="inline-filter">${select('recordKind', TEXT.recordKind, { '': TEXT.all, ...RECORD_KINDS }, data.filters.recordKind)}${button(TEXT.search, 'type="submit"')}</form>${table([TEXT.customer, TEXT.recordKind, TEXT.content, TEXT.recordedBy, TEXT.date, TEXT.nextVisit], recordRows(data))}`,
  button(TEXT.addRecord, 'data-modal="record"', true))}`;
const recordForm = data => form('saveRecord', `${customerSelect(data)}${select('kind', TEXT.recordKind, RECORD_KINDS)}${input('nextVisit', TEXT.nextVisit, '', 'date')}${textarea('content', TEXT.content, '', 'required')}`, data.actions.saveRecord.enabled);

export const renderTargetOptions = data => `<div class="target-options">${data.targets.map(row => `<label><input type="checkbox" name="targetIds" value="${e(row.id)}" ${new Map([[true, 'checked'], [false, '']]).get(data.targetIds.has(row.id))}>${e(row.name)}<span>${e((row.tags ?? []).join(' · '))}</span></label>`).join('')}</div>`;
const CONTENT_CONTROLS = {
  text: draft => textarea('content', TEXT.content, draft.content, 'required', PLACEHOLDERS.message),
  link: draft => input('content', CONTENT_KINDS.link, draft.content, 'url', 'required', PLACEHOLDERS.link),
  attachment: draft => `${field(TEXT.chooseFile, `<input data-label type="file" name="attachment" ${new Map([[true, ''], [false, 'required']]).get(Boolean(draft.attachment))}>`)}${note(draft.attachment?.name ?? '')}${textarea('content', TEXT.content, draft.content, '', PLACEHOLDERS.attachment)}`
};
export const renderContentInput = (kind, draft = { content: '', attachment: null }) => CONTENT_CONTROLS[CONTENT_INPUTS[kind]](draft);
export const messagesView = data => `${pending(PENDING.sending)}
${card(TEXT.targets, `<form data-target-filter class="inline-filter">${select('tag', TEXT.tags, { '': TEXT.all, ...Object.fromEntries(data.tagOptions.map(tag => [tag, tag])) }, data.filters.tag)}${button(TEXT.search, 'type="submit"')}</form>${note(TEXT.crossTags)}
<form data-form="submitTask"><div class="form-grid">${select('targetKind', TEXT.targetKind, TARGET_KINDS, data.targetKind)}${select('contentKind', TEXT.contentKind, CONTENT_KINDS, data.contentKind)}
<div class="form-field full"><div class="selection-head"><strong>${e(TEXT.targets)}</strong>${button(TEXT.selectAll, 'type="button" data-select-targets')}</div><div id="target-options">${renderTargetOptions(data)}</div><p id="target-count">${e(TEXT.selected)} ${data.targetIds.size}</p>${note(TEXT.groupSource)}</div>
<div class="form-field full" id="task-content">${renderContentInput(data.contentKind, data.taskDraft)}</div></div><div class="form-actions">${note(TEXT.localOnly)}${button(TEXT.submitTask, `type="submit" ${disabled(data, 'submitTask')}`, true)}</div></form>`)}
${card(TEXT.taskResults, `${table([TEXT.targets, TEXT.contentKind, TEXT.content, TEXT.taskStatus], data.tasks.map(row => [row.targets, CONTENT_KINDS[row.contentKind], row.attachment?.name ?? row.content, row.status]), TEXT.taskEmpty)}
<div class="action-row">${button(TEXT.stopPending, disabled(data, 'stopTask'))}</div>${pending(PENDING.provider)}${note(TEXT.delivery)}`)}`;

export const groupsView = data => `${pending(PENDING.groups)}${card(TEXT.groupName, `${form('renameGroups', `${select('grade', DIMENSIONS[0].label, { '': TEXT.pending })}${input('name', TEXT.newGroupName)}`, data.actions.renameGroups.enabled, TEXT.renameGroup)}${table([TEXT.groupName, DIMENSIONS[0].label, TEXT.groupClass, TEXT.owner], data.groups.map(row => [row.name, row.grade, row.groupClass, row.ownerName ?? row.owner]), TEXT.noGroups)}`)}${card(TEXT.groupResults, table([TEXT.groupName, TEXT.newGroupName, TEXT.taskStatus], []))}${card(TEXT.boundaries, note(TEXT.guards.at(-1)))}`;
export const followupsView = data => `${pending(data.followup.message)}<div class="rule-grid">${FOLLOWUP_RULES.map(label => card(label, `${note(TEXT.followupTargets)}${button(TEXT.generateFollowup, disabled(data, 'generateFollowups'))}`)).join('')}</div>${card(TEXT.followupTasks, table([TEXT.customer, TEXT.recordKind, TEXT.taskStatus, TEXT.nextVisit], []))}`;
export const welcomeView = data => `${pending(PENDING.welcome)}${card(TEXT.welcomeTemplate, form('saveWelcome', textarea('content', TEXT.content, data.welcome, 'required', PLACEHOLDERS.welcome), data.actions.saveWelcome.enabled))}${card(TEXT.welcomeResults, `${table([TEXT.customer, TEXT.taskStatus, TEXT.date], [], TEXT.noEvent)}${pending(PENDING.provider)}`)}`;

export const statisticsView = data => `${filterBar(data)}<div class="query-tabs">${TEXT.queries.map((label, index) => button(label, `data-query="${index}"`)).join('')}</div>
<div data-query-section="0">${card(TEXT.queries[0], table([TEXT.orderId, TEXT.customer, TEXT.product, TEXT.amount, TEXT.owner, TEXT.date], orderRows(data)))}</div>
<div data-query-section="1">${card(TEXT.queries[1], pending(PENDING.performance))}</div>
<div data-query-section="2">${card(TEXT.queries[2], table([TEXT.customer, TEXT.recordKind, TEXT.content, TEXT.recordedBy, TEXT.date, TEXT.nextVisit], recordRows({ records: data.recordQueries.consultation })))}</div>
<div data-query-section="3">${card(TEXT.queries[3], table([TEXT.customer, TEXT.recordKind, TEXT.content, TEXT.recordedBy, TEXT.date, TEXT.nextVisit], recordRows({ records: data.recordQueries.revisit })))}</div>
${card(TEXT.distributions, `${pending(PENDING.dimensions)}<div class="distribution-grid">${data.dimensions.map(item => `<section><h3>${e(item.label)}</h3>${table([TEXT.value, TEXT.count, TEXT.percent], item.entries.map(row => [row.value, row.count, TEXT.pending]))}</section>`).join('')}</div>`)}
${card(TEXT.performance, `${pending(PENDING.performance)}${table([TEXT.totalPerformance, TEXT.productPerformance, TEXT.peoplePerformance], [[TEXT.pending, TEXT.pending, TEXT.pending]])}${button(TEXT.exportPerformance, 'disabled')}`)}`;

export const materialsView = data => `${pending(PENDING.materials)}${card(TEXT.shared, `<div class="inline-filter">${select('materialType', TEXT.materialType, { file: TEXT.file, image: TEXT.image })}${field(TEXT.chooseFile, '<input data-label type="file" id="material-file">')}</div>${note(TEXT.materialNotice)}<div id="material-preview" class="material-preview"></div>${table([TEXT.filename, TEXT.materialType, TEXT.fileSize], [], TEXT.noMaterials)}<div class="action-row">${button(TEXT.save, disabled(data, 'saveMaterial'))}${button(TEXT.useMaterial, 'disabled')}</div>`)}`;
export const phrasesView = data => `${note(TEXT.personal)}${pending(PENDING.phrases)}${card(TEXT.personal, table([TEXT.phraseTitle, TEXT.content, TEXT.capability], data.phrases.map(row => [row.title, row.content, { html: `<div class="action-row">${button(TEXT.edit, `data-edit-phrase="${e(row.id)}"`)}${button(TEXT.remove, `data-delete-phrase="${e(row.id)}"`)}</div>` }]), TEXT.noPhrases), button(TEXT.addPhrase, 'data-modal="phrase"', true))}`;
const phraseForm = (data, id = '') => {
  const phrase = data.phrases.find(row => row.id === id) ?? {};
  return form('savePhrase', `<input name="id" type="hidden" value="${e(phrase.id)}">${input('title', TEXT.phraseTitle, phrase.title, 'text', 'required')}${textarea('content', TEXT.content, phrase.content, 'required', PLACEHOLDERS.phrase)}`, data.actions.savePhrase.enabled);
};

export const exportView = data => `${filterBar(data)}${pending(PENDING.exports)}${note(TEXT.exportNotice)}<div class="overview-grid">${data.exports.map(item => card(item.title, note(ROLES[data.role].scopeLabel), button(item.title, `data-export="${item.id}" ${new Map([[true, ''], [false, 'disabled']]).get(item.status === 'ready')}`, true))).join('')}</div>${card(TEXT.matching, table([TEXT.orderId, TEXT.customer, TEXT.product, TEXT.amount, TEXT.owner, TEXT.date], orderRows(data)))}`;
export const settingsView = () => `${card(TEXT.permissions, table([TEXT.role, TEXT.scope, TEXT.authorization], [
  [ROLES.admin.label, TEXT.adminScope, TEXT.pending], [ROLES.supervisor.label, TEXT.supervisorScope, TEXT.pendingTeam], [ROLES.sales.label, TEXT.salesScope, TEXT.permissionPending]
]))}${pending(PENDING.retention)}`;

const views = { customers: customersView, transactions: transactionsView, records: recordsView, messages: messagesView, groups: groupsView, followups: followupsView, welcome: welcomeView, statistics: statisticsView, materials: materialsView, phrases: phrasesView, export: exportView, settings: settingsView };
export const renderRoute = (route, data) => `${scopeNote(data)}${views[route](data)}`;
export const renderShell = (route, data) => {
  const definition = data.routes.find(item => item.id === route);
  return `<div class="app-shell"><aside class="sidebar"><div class="brand"><div class="brand-mark">警</div><div class="brand-text"><strong>${e(TEXT.brand)}</strong><span>SCRM</span></div></div><nav class="nav-group"><div class="nav-label">${e(TEXT.contractWork)}</div>${data.routes.map(item => `<button class="nav-item ${new Map([[true, 'active'], [false, '']]).get(item.id === route)}" data-route="${item.id}" title="${e(item.title)}">${icon(item.icon)}<span class="nav-name">${e(item.title)}</span></button>`).join('')}</nav><div class="sidebar-foot"><div class="scope-card"><small>${e(TEXT.scope)}</small>${e(ROLES[data.role].scopeLabel)}</div></div></aside>
  <main class="main-wrap"><header class="topbar"><div class="crumb"><span>${e(TEXT.brand)}</span><span>/</span><strong>${e(definition.title)}</strong></div><div class="top-actions"><span class="preview-label">${e(TEXT.preview)}</span><div class="role-switch" aria-label="${e(TEXT.roleLabel)}">${Object.entries(ROLES).map(([id, role]) => `<button class="role-button ${new Map([[true, 'active'], [false, '']]).get(id === data.role)}" data-role="${id}">${e(role.label)}</button>`).join('')}</div></div></header>
  <section class="content"><div class="preview-note">${e(TEXT.previewNote)}</div><div class="page-head"><div><h1 class="page-title">${e(definition.title)}</h1><p class="page-subtitle">${e(definition.description)}</p></div></div><div role="status" class="result-banner ${e(data.result.status)}" ${new Map([[true, ''], [false, 'hidden']]).get(Boolean(data.result.message))}>${e(data.result.message)}</div>${renderRoute(route, data)}</section></main></div>`;
};

const MODALS = { order: { title: TEXT.addOrder, view: dealFormView }, refund: { title: TEXT.addRefund, view: refundForm }, record: { title: TEXT.addRecord, view: recordForm }, phrase: { title: TEXT.addPhrase, view: phraseForm }, customer: { title: TEXT.customer, view: customerDetail } };
export const renderModal = (type, data, id) => {
  const definition = MODALS[type];
  if (!definition) return '';
  return `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 id="modal-title">${e(definition.title)}</h2>${button(TEXT.close, 'data-close-modal')}</div><div class="modal-body">${definition.view(data, id)}</div></section></div>`;
};
