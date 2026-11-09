import { CONTENT_KINDS, PREVIEW_DATA, ROLES, TARGET_KINDS, TEXT } from './contracts.js';
import { activateRoute, buildExport, createState, project, reduce, resolveRoute, selectTargets as updateTargets } from './projection.js';
import { renderContentInput, renderModal, renderShell as shell, renderTargetOptions } from './views.js';

let state = createState(structuredClone(PREVIEW_DATA));
let projection = project(state);
let previewUrl = null;
let revision = 0;
const requests = new WeakMap();
const root = document.querySelector('#app');
const modalRoot = document.querySelector('#modal-root');
const toastRoot = document.querySelector('#toast-root');

const currentRoute = () => resolveRoute(state.role, location.hash.replace('#/', '') || 'customers');
const releasePreview = () => {
  if (!previewUrl) return;
  URL.revokeObjectURL(previewUrl);
  previewUrl = null;
};
const renderShell = () => {
  revision += 1;
  releasePreview();
  projection = project(state);
  root.innerHTML = shell(currentRoute(), projection);
};
const closeModal = () => {
  root.inert = false;
  modalRoot.innerHTML = '';
};
const openModal = (type, id = '') => {
  root.inert = true;
  modalRoot.innerHTML = renderModal(type, projection, id);
  modalRoot.querySelector('input:not([type="hidden"]), select, textarea, button')?.focus();
};
const showToast = message => {
  // One accessible status projection, with no delayed callback or stale success state.
  toastRoot.textContent = message;
  toastRoot.setAttribute('role', 'status');
  toastRoot.className = 'local-toast';
};
const requestFor = form => {
  if (!requests.has(form)) requests.set(form, crypto.randomUUID());
  return requests.get(form);
};
const formPayload = form => {
  const values = new FormData(form);
  const file = values.get('attachment');
  const attachment = file?.name ? { name: file.name, size: file.size, type: file.type } : state.taskDraft.attachment;
  return { ...Object.fromEntries(values), attachment, targetIds: [...state.targetIds], tags: values.getAll('tags') };
};
const command = (type, payload, requestId = crypto.randomUUID()) => {
  state = reduce(state, { type, payload, requestId });
  projection = project(state);
  return state.result;
};
const FORM_OUTCOMES = {
  success: () => { closeModal(); renderShell(); },
  error: result => showToast(result.message), blocked: result => showToast(result.message), idle: () => {}
};
const saveForm = form => {
  const result = command(form.dataset.form, formPayload(form), requestFor(form));
  FORM_OUTCOMES[result.status](result);
};
const applyFilter = form => {
  const values = Object.fromEntries(new FormData(form));
  state = { ...state, filters: { ...state.filters, ...values }, result: { status: 'idle', message: '' } };
  renderShell();
};
const resetFilter = () => {
  state = { ...state, filters: { query: '', start: '', end: '', recordKind: '', tag: '' } };
  renderShell();
};
const changeRole = element => {
  if (!ROLES[element.dataset.role]) return;
  closeModal();
  state = { ...state, role: element.dataset.role, targetIds: new Set(), filterContexts: new Map(), filterContext: 'customers', filters: { query: '', start: '', end: '', recordKind: '', tag: '' }, result: { status: 'idle', message: '' } };
  location.hash = '#/customers';
  renderShell();
};
const renderTargets = () => {
  projection = project(state);
  document.querySelector('#target-options').innerHTML = renderTargetOptions(projection);
  document.querySelector('#target-count').textContent = `${TEXT.selected} ${projection.targetIds.size}`;
};
const selectTargets = () => {
  state = updateTargets(state, { ids: projection.targets.map(row => row.id), selected: true });
  renderTargets();
};
const previewMaterial = input => {
  releasePreview();
  const file = input.files?.[0];
  const container = document.querySelector('#material-preview');
  if (!file || !container) return;
  container.replaceChildren();
  const label = document.createElement('p');
  label.textContent = `${file.name} · ${file.size} bytes`;
  container.append(label);
  if (!file.type.startsWith('image/')) return;
  previewUrl = URL.createObjectURL(file);
  const image = document.createElement('img'); image.src = previewUrl; image.alt = file.name;
  container.append(image);
};
const exportCsv = kind => {
  const result = buildExport(projection, kind);
  if (result.status !== 'ready') { showToast(result.message); return; }
  if (!result.rows.length) { showToast(TEXT.exportEmpty); return; }
  // Treat user-entered CSV cells as literal text in spreadsheet applications.
  const literal = value => String(value).replace(/^[=+@\-\t\r]/, prefix => `'${prefix}`);
  const csv = '\ufeff' + [result.headers, ...result.rows].map(row => row.map(value => `"${literal(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${result.title}.csv`; anchor.click();
  URL.revokeObjectURL(url);
};
const queryFocus = element => {
  document.querySelector(`[data-query-section="${element.dataset.query}"]`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
};

// Declarative UI dispatch. Permission and workflow decisions remain in projection/contracts.
const CLICKS = new Map([
  ['[data-route]', element => { closeModal(); location.hash = `#/${element.dataset.route}`; }],
  ['[data-role]', changeRole], ['[data-modal]', element => openModal(element.dataset.modal)],
  ['[data-close-modal]', closeModal], ['[data-customer]', element => openModal('customer', element.dataset.customer)],
  ['[data-reset-filter]', resetFilter], ['[data-select-targets]', selectTargets],
  ['[data-edit-phrase]', element => openModal('phrase', element.dataset.editPhrase)],
  ['[data-delete-phrase]', element => { command('deletePhrase', { id: element.dataset.deletePhrase }); renderShell(); }],
  ['[data-export]', element => exportCsv(element.dataset.export)],
  ['[data-query]', queryFocus]
]);
const onClick = event => {
  const entry = [...CLICKS].find(([selector]) => event.target.closest(selector));
  if (!entry) return;
  const [selector, handle] = entry;
  handle(event.target.closest(selector));
};
const SUBMITS = new Map([
  ['[data-form]', saveForm], ['[data-filter]', applyFilter],
  ['[data-kind-filter]', applyFilter], ['[data-target-filter]', applyFilter]
]);
const onSubmit = event => {
  const entry = [...SUBMITS].find(([selector]) => event.target.matches(selector));
  if (!entry) return;
  event.preventDefault();
  entry[1](event.target);
};
const onInput = event => {
  if (event.target.matches('[name="content"]') && event.target.closest('[data-form="submitTask"]')) {
    state = { ...state, taskDraft: { ...state.taskDraft, content: event.target.value } };
  }
};
const onChange = event => {
  if (event.target.matches('#material-file')) previewMaterial(event.target);
  if (event.target.matches('[name="targetIds"]')) {
    state = updateTargets(state, { ids: [event.target.value], selected: event.target.checked });
    renderTargets();
  }
  if (event.target.matches('[name="targetKind"]') && TARGET_KINDS[event.target.value]) {
    state = { ...state, targetKind: event.target.value, targetIds: new Set() };
    renderTargets();
  }
  if (event.target.matches('[name="contentKind"]') && CONTENT_KINDS[event.target.value]) {
    state = { ...state, contentKind: event.target.value, taskDraft: { content: '', attachment: null } };
    document.querySelector('#task-content').innerHTML = renderContentInput(event.target.value, state.taskDraft);
  }
  if (event.target.matches('[name="attachment"]')) {
    const file = event.target.files?.[0];
    if (file) state = { ...state, taskDraft: { ...state.taskDraft, attachment: { name: file.name, size: file.size, type: file.type } } };
  }
};
const onKey = event => {
  if (event.key === 'Escape') closeModal();
};
const onRoute = () => {
  closeModal();
  history.replaceState(null, '', `#/${currentRoute()}`);
  state = activateRoute(state, currentRoute());
  renderShell();
};
const dispose = () => {
  revision += 1;
  releasePreview();
  document.removeEventListener('click', onClick);
  document.removeEventListener('submit', onSubmit);
  document.removeEventListener('input', onInput);
  document.removeEventListener('change', onChange);
  document.removeEventListener('keydown', onKey);
  window.removeEventListener('hashchange', onRoute);
};

const attach = () => {
  document.addEventListener('click', onClick);
  document.addEventListener('submit', onSubmit);
  document.addEventListener('input', onInput);
  document.addEventListener('change', onChange);
  document.addEventListener('keydown', onKey);
  window.addEventListener('hashchange', onRoute);
  window.addEventListener('pagehide', dispose, { once: true });
};
const onPageShow = event => {
  if (!event.persisted) return;
  attach();
  renderShell();
};
attach();
window.addEventListener('pageshow', onPageShow);
onRoute();
