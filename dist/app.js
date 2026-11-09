const ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  chat: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  deal: '<path d="M20 7h-4V3H8v4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M8 7h8M12 11v6M9 14h6"/>',
  approval: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  export: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06L7.04 4.3l.06.06A1.65 1.65 0 0 0 8.92 4a1.65 1.65 0 0 0 1-1.51V2h4v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9c.12.61.66 1.05 1.28 1.05H21v4h-.32c-.62 0-1.16.44-1.28 1.05z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.83 1c0 2-3 2-3 4M12 18h.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  filter: '<path d="M4 4h16l-6 7v6l-4 2v-8z"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3"/>',
  warning: '<path d="M10.3 2.9L1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
  money: '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8M12 6v12"/>',
  refund: '<path d="M3 10h11a4 4 0 1 1 0 8H9"/><path d="M7 6l-4 4 4 4"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  chevron: '<path d="M9 18l6-6-6-6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  upload: '<path d="M16 16l-4-4-4 4M12 12v9"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>',
  lock: '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M17 11l2 2 4-4"/>'
};

const icon = (name, className = 'icon') => `<span class="${className}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.help}</svg></span>`;

const state = {
  role: 'admin',
  activeConversation: 0,
  chatTab: 'all',
  activeApproval: 0,
  confirmedApprovals: new Set(),
  newDeal: false,
  customerQuery: ''
};

const conversations = [
  { name: '周念', short: '周', color: '#e88a72', account: '企微 02号', time: '10:24', preview: '好的老师，我晚点把合同发您', unread: 2, type: 'direct' },
  { name: '陈一诺家长', short: '陈', color: '#5f83c6', account: '企微 03号', time: '09:48', preview: '请问尾款最晚什么时候交？', unread: 1, type: 'direct' },
  { name: '26届联报咨询群', short: '群', color: '#6eab7d', account: '企微 01号', time: '09:32', preview: '刘老师：今晚有公开课吗？', unread: 8, type: 'group' },
  { name: '林夏', short: '林', color: '#ad70b1', account: '企微 02号', time: '昨天', preview: '[图片] 这是我的成绩单', unread: 0, type: 'direct' },
  { name: '袁嘉乐', short: '袁', color: '#d4a04f', account: '企微 04号', time: '昨天', preview: '暂未回复', unread: 0, type: 'unanswered' },
  { name: '高三冲刺A班', short: 'A', color: '#508fa2', account: '企微 01号', time: '周二', preview: '群公告已更新', unread: 0, type: 'group' },
  { name: '吴颖', short: '吴', color: '#6b74d7', account: '企微 04号', time: '周一', preview: '老师我考虑一下', unread: 0, type: 'unanswered' }
];

const customers = [
  { name: '周念', short: '周', color: '#e88a72', wechat: 'nian_2026', grade: '高三', province: '江苏省', school: '南京外国语学校', owner: '刘芸', status: '已成交', tags: ['26届联报', '重点跟进'] },
  { name: '陈一诺家长', short: '陈', color: '#5f83c6', wechat: 'chenmom88', grade: '高二', province: '浙江省', school: '杭州学军中学', owner: '莎莎', status: '跟进中', tags: ['意向A', '家长'] },
  { name: '林夏', short: '林', color: '#ad70b1', wechat: 'linxia07', grade: '高三', province: '上海市', school: '上海中学', owner: '双燕', status: '已成交', tags: ['数学强化'] },
  { name: '吴颖', short: '吴', color: '#6b74d7', wechat: 'wuying_9', grade: '高一', province: '安徽省', school: '合肥一中', owner: '刘芸', status: '待跟进', tags: ['新客户'] },
  { name: '袁嘉乐', short: '袁', color: '#d4a04f', wechat: 'yuanjl', grade: '高二', province: '湖北省', school: '武汉二中', owner: '莎莎', status: '待跟进', tags: ['未回复'] }
];

const deals = [
  { id: 'CJ202611060018', student: '周念', wechat: 'nian_2026', package: '高三数学冲刺 + 联报', owner: '刘芸', company: '警然教育', amount: '¥16,800', paid: '2026-11-06 10:12', status: '待财务确认' },
  { id: 'CJ202611050061', student: '林夏', wechat: 'linxia07', package: '高三英语强化班', owner: '双燕', company: '知行教育', amount: '¥8,800', paid: '2026-11-05 17:40', status: '已确认' },
  { id: 'CJ202611050044', student: '郭思远', wechat: 'guo_sy', package: '物理培优班', owner: '莎莎', company: '警然教育', amount: '¥6,980', paid: '2026-11-05 14:21', status: '分期中' },
  { id: 'CJ202611040129', student: '许安然', wechat: 'xuran_26', package: '高三全科联报', owner: '刘芸', company: '警然教育', amount: '¥24,600', paid: '2026-11-04 19:08', status: '已确认' },
  { id: 'CJ202611030083', student: '秦越', wechat: 'qinyue2026', package: '数学一对一', owner: '双燕', company: '知行教育', amount: '¥12,000', paid: '2026-11-03 11:36', status: '退费审批中' }
];

const approvals = [
  { id: 'CJ202611060018', type: '财务确认', student: '周念', owner: '刘芸', amount: '¥16,800', submitted: '今天 10:14', company: '警然教育', desc: '微信支付，一次性付清', action: '确认到账' },
  { id: 'TF202611060003', type: '退费审批', student: '秦越', owner: '双燕', amount: '¥4,000', submitted: '今天 09:38', company: '知行教育', desc: '课程调整，退还未消课时', action: '同意退费' },
  { id: 'ZF202611050012', type: '作废申请', student: '唐雨晴', owner: '莎莎', amount: '¥9,800', submitted: '昨天 18:26', company: '警然教育', desc: '院校信息填写错误，需重录', action: '同意作废' },
  { id: 'JJ202611050007', type: '客户交接', student: '周念', owner: '刘芸', amount: '—', submitted: '昨天 16:42', company: '企微 03号 → 企微 02号', desc: '老客户重复添加，交回最早归属销售', action: '确认交接' }
];

const navItems = [
  { route: 'dashboard', label: '工作台', icon: 'dashboard' },
  { route: 'chat', label: '会话', icon: 'chat', badge: '3' },
  { route: 'customers', label: '客户', icon: 'users' },
  { route: 'transactions', label: '成交管理', icon: 'deal' },
  { route: 'approvals', label: '审批中心', icon: 'approval', badge: '6', adminOnly: true },
  { route: 'export', label: '数据导出', icon: 'export' },
  { route: 'settings', label: '系统设置', icon: 'settings', adminOnly: true }
];

const routeTitles = {
  dashboard: '工作台', chat: '会话', customers: '客户管理', transactions: '成交管理', deal: '录入成交', approvals: '审批中心', export: '数据导出', settings: '系统设置'
};

function currentRoute() {
  const route = location.hash.replace('#/', '') || 'dashboard';
  return routeTitles[route] ? route : 'dashboard';
}

function navForRole() {
  return navItems.filter(item => !(item.adminOnly && state.role !== 'admin'));
}

function renderShell() {
  let route = currentRoute();
  if (state.role === 'sales' && ['approvals', 'settings'].includes(route)) route = 'dashboard';
  const nav = navForRole().map(item => `
    <button class="nav-item ${route === item.route || (route === 'deal' && item.route === 'transactions') ? 'active' : ''}" data-route="${item.route}">
      ${icon(item.icon, 'nav-icon')}
      <span class="nav-name">${item.label}</span>
      ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
    </button>`).join('');

  document.querySelector('#app').innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">Q</div>
          <div class="brand-text"><strong>警然 SCRM</strong><span>WEWORK CRM</span></div>
        </div>
        <nav class="nav-group">
          <div class="nav-label">业务中心</div>
          ${nav}
        </nav>
        <div class="sidebar-foot">
          <div class="scope-card">
            <small>当前数据范围</small>
            <div class="scope-row"><span class="scope-dot"></span>${state.role === 'admin' ? '全部企微账号 · 8个' : '已授权企微账号 · 2个'}</div>
          </div>
        </div>
      </aside>
      <main class="main-wrap">
        <header class="topbar">
          <div class="crumb"><span>警然教育</span><span>/</span><strong>${routeTitles[route]}</strong></div>
          <div class="top-actions">
            <div class="role-switch" aria-label="切换演示角色">
              <button class="role-button ${state.role === 'admin' ? 'active' : ''}" data-role="admin">管理员视角</button>
              <button class="role-button ${state.role === 'sales' ? 'active' : ''}" data-role="sales">销售视角</button>
            </div>
            <button class="top-icon-btn" aria-label="帮助">${icon('help')}</button>
            <button class="top-icon-btn" aria-label="通知">${icon('bell')}</button>
            <div class="user-chip">
              <div class="avatar">${state.role === 'admin' ? '管' : '刘'}</div>
              <div class="user-meta"><strong>${state.role === 'admin' ? '管理员' : '刘芸'}</strong><span>${state.role === 'admin' ? '业务负责人' : '销售顾问'}</span></div>
            </div>
          </div>
        </header>
        <section class="content">${renderRoute(route)}</section>
      </main>
    </div>`;
}

function pageHead(eyebrow, title, subtitle, actions = '') {
  return `<div class="page-head">
    <div><div class="eyebrow">${eyebrow}</div><h1 class="page-title">${title}</h1><p class="page-subtitle">${subtitle}</p></div>
    <div class="head-actions">${actions}</div>
  </div>`;
}

function renderRoute(route) {
  const views = { dashboard: dashboardView, chat: chatView, customers: customersView, transactions: transactionsView, deal: dealFormView, approvals: approvalsView, export: exportView, settings: settingsView };
  return (views[route] || dashboardView)();
}

function dashboardView() {
  const isAdmin = state.role === 'admin';
  const metrics = isAdmin ? [
    ['今日业绩', '¥36,580', '较昨日', '+12.6%', true],
    ['本周业绩', '¥184,260', '本周目标 ¥240,000', '76.8%'],
    ['本月业绩', '¥682,400', '本月目标 ¥900,000', '75.8%'],
    ['本年业绩', '¥7,846,220', '较去年同期', '+18.4%']
  ] : [
    ['今日业绩', '¥16,800', '较昨日', '+100%', true],
    ['本周业绩', '¥46,800', '个人周目标 ¥60,000', '78.0%'],
    ['本月业绩', '¥168,400', '个人月目标 ¥220,000', '76.5%'],
    ['本年业绩', '¥1,862,000', '较去年同期', '+16.2%']
  ];
  const cards = metrics.map((m, i) => `<div class="card metric-card ${i === 0 ? 'metric-primary' : ''}" style="--metric-glow:${['#ededff','#eaf9f5','#fff3e5','#eef3ff'][i]}">
    <div class="metric-label"><span>${m[0]}</span>${icon(['money','target','deal','calendar'][i])}</div>
    <div class="metric-value">${m[1]}</div>
    <div class="metric-foot"><span>${m[2]}</span><span class="metric-delta">${m[3]}</span></div>
  </div>`).join('');

  return `${pageHead('Dashboard', isAdmin ? '团队工作台' : '我的工作台', isAdmin ? '优先显示今日业绩与待处理事项，所有金额仅统计财务已确认订单。' : '仅展示本人名下客户与业绩，其他销售数据已隔离。', `
    <div class="segmented"><button>今日</button><button>本周</button><button class="active">本月</button><button>本年</button></div>
    <button class="btn">${icon('calendar')} 2026年11月</button>`)}
    <div class="metric-grid">${cards}</div>
    <div class="dashboard-grid">
      <div class="stack">
        <div class="card">
          <div class="card-head"><div><div class="card-title">${icon('target')} ${isAdmin ? '销售目标完成情况' : '我的目标进度'}</div><div class="card-note">按财务已确认金额统计</div></div><button class="btn btn-sm">目标设置</button></div>
          <div class="card-body">
            ${targetRows(isAdmin)}
          </div>
        </div>
        <div class="card">
          <div class="card-head"><div class="card-title">${icon('clock')} 最新业务动态</div><button class="btn btn-ghost btn-sm">查看全部</button></div>
          <div class="card-body">
            ${dashboardActivities(isAdmin)}
          </div>
        </div>
      </div>
      <div class="stack">
        <div class="card">
          <div class="card-head"><div><div class="card-title">${icon('approval')} 待处理事项</div><div class="card-note">按业务优先级排序</div></div><button class="btn btn-ghost btn-sm" data-route="${isAdmin ? 'approvals' : 'transactions'}">进入处理</button></div>
          <div class="card-body">
            ${todo('money', isAdmin ? '待财务确认' : '待确认成交', isAdmin ? '确认到账后计入团队业绩' : '财务确认后计入个人业绩', isAdmin ? 3 : 1, '#b77813', '#fff5e5')}
            ${todo('refund', isAdmin ? '待审批退费' : '退费处理中', isAdmin ? '审批通过后自动冲减归属销售业绩' : '等待管理员审核', isAdmin ? 2 : 1, '#c94c59', '#fff0f1')}
            ${todo('trash', isAdmin ? '待处理作废' : '分期待跟进', isAdmin ? '核验原因并保留完整审计记录' : '7天内到期的尾款提醒', isAdmin ? 1 : 2, '#5f6cb3', '#eff1ff')}
          </div>
        </div>
        <div class="card">
          <div class="card-head"><div class="card-title">${icon('users')} 客户概况</div><button class="btn btn-ghost btn-sm" data-route="customers">客户列表</button></div>
          <div class="card-body">
            <div class="info-grid">
              <div class="info-cell"><span>新增客户</span><strong>${isAdmin ? '42' : '8'} 人</strong></div>
              <div class="info-cell"><span>待跟进</span><strong>${isAdmin ? '18' : '5'} 人</strong></div>
              <div class="info-cell"><span>重复添加</span><strong>${isAdmin ? '4' : '1'} 人</strong></div>
              <div class="info-cell"><span>连报学员</span><strong>${isAdmin ? '32.6%' : '37.5%'}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function targetRows(isAdmin) {
  const rows = isAdmin ? [
    ['刘芸','刘','#6b74d7','¥168,400 / ¥220,000',76], ['莎莎','莎','#e57f7d','¥142,600 / ¥200,000',71], ['双燕','双','#4d9b8a','¥128,200 / ¥180,000',71], ['小迪','迪','#d39a4e','¥96,800 / ¥160,000',61]
  ] : [['刘芸','刘','#6b74d7','¥168,400 / ¥220,000',76], ['新签客户','8','#4d9b8a','本月成交 12 笔',80], ['连报占比','38%','#d39a4e','目标 35%',100]];
  return rows.map(row => `<div class="target-row"><div class="person"><span class="mini-avatar" style="--avatar:${row[2]}">${row[1]}</span><div><strong>${row[0]}</strong><span>${isAdmin ? '销售顾问' : row[3]}</span></div></div><div class="progress"><span style="width:${row[4]}%"></span></div><div class="amount">${isAdmin ? row[3] : ''}</div><div class="ratio">${row[4]}%</div></div>`).join('');
}

const todo = (iconName, title, desc, count, color, bg) => `<div class="todo-item"><div class="todo-icon" style="--todo-color:${color};--todo-bg:${bg}">${icon(iconName)}</div><div class="todo-copy"><strong>${title}</strong><span>${desc}</span></div><div class="todo-count">${count}</div></div>`;
const activity = (title, desc, time, color) => `<div class="activity-item"><span class="activity-dot" style="--dot:${color}"></span><div class="activity-copy"><strong>${title}</strong><span>${desc}</span></div><time class="activity-time">${time}</time></div>`;
function dashboardActivities(isAdmin) {
  const rows = isAdmin ? [
    ['刘芸录入周念的成交单，等待财务确认', '订单 CJ202611060018 · ¥16,800', '8分钟前', '#e69324'],
    ['财务确认林夏订单到账', '订单 CJ202611050061 · ¥8,800', '42分钟前', '#08a883'],
    ['双燕发起秦越退费申请', '预计冲减业绩 ¥4,000', '1小时前', '#e15863'],
    ['客户周念发起后台交接', '企微03号 → 企微02号 · 归属刘芸', '昨天', '#5b5bd6']
  ] : [
    ['我录入周念的成交单，等待财务确认', '订单 CJ202611060018 · ¥16,800', '8分钟前', '#e69324'],
    ['财务确认许安然订单到账', '订单 CJ202611040129 · ¥24,600', '42分钟前', '#08a883'],
    ['客户周念已交接至我的企微账号', '企微03号 → 企微02号', '昨天', '#5b5bd6'],
    ['分期客户郭思远即将到期', '尾款 ¥3,490 · 还剩 6 天', '昨天', '#e69324']
  ];
  return rows.map(row => activity(...row)).join('');
}

function chatView() {
  const active = conversations[state.activeConversation] || conversations[0];
  const filtered = state.chatTab === 'all' ? conversations : conversations.filter(c => c.type === state.chatTab);
  return `<div class="chat-workspace">
    <aside class="chat-panel">
      <div class="chat-tools">
        <div class="search">${icon('search')}<input id="chat-search" placeholder="搜索昵称、备注名或消息" /></div>
        <div class="filter-row"><select class="select"><option>${state.role === 'admin' ? '全部企微账号' : '我的企微账号'}</option><option>企微 01号</option><option>企微 02号</option></select><select class="select"><option>全部会话</option><option>仅看客户</option></select></div>
      </div>
      <div class="chat-tabs">
        ${chatTabButton('all','全部')}${chatTabButton('direct','发给我的')}${chatTabButton('group','群聊')}${chatTabButton('unanswered','未回复',2)}
      </div>
      <div class="conversation-list">
        ${filtered.map((c) => conversationItem(c, conversations.indexOf(c), active.name === c.name)).join('')}
      </div>
    </aside>
    <section class="chat-main">
      <div class="chat-head">
        <div class="chat-contact"><div class="conversation-avatar" style="--avatar-bg:${active.color}">${active.short}<span class="channel-dot">微</span></div><div><strong>${active.name}</strong><span>${active.account}<em class="owner-pill">${icon('userCheck')} 归属：刘芸</em></span></div></div>
        <div class="chat-actions"><button aria-label="更多">${icon('more')}</button></div>
      </div>
      <div class="messages">
        <div class="date-divider">今天 10:08</div>
        <div class="message-row"><div class="message-avatar">${active.short}</div><div class="bubble-wrap"><div class="bubble-meta">${active.name}</div><div class="bubble">刘老师，我想了解一下高三数学冲刺班，现在报名还来得及吗？</div></div></div>
        <div class="message-row out"><div class="message-avatar">刘</div><div class="bubble-wrap"><div class="bubble-meta">10:10 · ${active.account}</div><div class="bubble">来得及的。您之前在企微 03号咨询过，我先把历史情况同步过来，避免您重复说明。</div></div></div>
        <div class="system-message">检测到该客户曾由企微 02号最早添加，业绩归属刘芸。当前会话账号与归属账号一致。</div>
        <div class="message-row"><div class="message-avatar">${active.short}</div><div class="bubble-wrap"><div class="bubble-meta">${active.name}</div><div class="bubble">好的，孩子现在数学大概110分，主要想冲刺压轴题。</div></div></div>
        <div class="message-row out"><div class="message-avatar">刘</div><div class="bubble-wrap"><div class="bubble-meta">10:18 · ${active.account}</div><div class="bubble">明白，我给您推荐「高三数学冲刺 + 联报」套餐。合同和课程安排稍后发您。</div></div></div>
      </div>
      <div class="composer">
        <div class="composer-tools"><button>${icon('smile')}</button><button>${icon('image')}</button><button>${icon('file')}</button><button>${icon('mic')}</button></div>
        <textarea id="chat-input" placeholder="输入消息，Enter 发送，Shift + Enter 换行"></textarea>
        <div class="composer-foot"><span class="composer-hint">客户可见 · 当前发送账号 ${active.account}</span><button class="btn btn-primary btn-sm" id="send-message">发送</button></div>
      </div>
    </section>
    <aside class="chat-panel customer-panel">
      <div class="profile-head"><div class="profile-avatar">${active.short}</div><strong>${active.name}</strong><span>微信昵称：念 · 外部联系人</span></div>
      <div class="duplicate-alert">${icon('warning')}<div><strong>检测到 2 条添加记录</strong><br/>最早由企微 02号添加，归属销售为刘芸。</div></div>
      <div class="profile-section"><div class="section-head"><strong>客户信息</strong><button data-route="customers">查看详情</button></div>${infoRow('客户备注名','周念（家长）')}${infoRow('手机号','138****7621')}${infoRow('年级 / 院校','高三 · 南京外国语学校')}${infoRow('所在省份','江苏省')}</div>
      <div class="profile-section"><div class="section-head"><strong>标签</strong><button>+ 添加</button></div><div class="tags"><span class="tag">26届联报</span><span class="tag">数学冲刺</span><span class="tag">已成交</span></div></div>
      <div class="profile-section"><div class="section-head"><strong>添加记录</strong><button data-modal="records">全部 2 条</button></div><div class="owner-record"><span class="mini-avatar" style="--avatar:#6b74d7">02</span><div class="record-copy"><strong>企微 02号 · 刘芸</strong><span>2025-07-11 11:23 · 最早添加</span></div><button class="btn btn-sm" data-toast="已切换至企微 02号会话">会话</button></div><div class="owner-record"><span class="mini-avatar" style="--avatar:#4d9b8a">03</span><div class="record-copy"><strong>企微 03号 · 莎莎</strong><span>2026-11-05 16:18 · 待交接</span></div><button class="btn btn-sm" data-modal="handover">交接</button></div></div>
    </aside>
  </div>`;
}

function chatTabButton(key, label, count = '') { return `<button class="${state.chatTab === key ? 'active' : ''}" data-chat-tab="${key}">${label}${count ? `<span class="tab-count">${count}</span>` : ''}</button>`; }
function conversationItem(c, index, active) { return `<button class="conversation-item ${active ? 'active' : ''}" data-conversation="${index}"><div class="conversation-avatar" style="--avatar-bg:${c.color}">${c.short}<span class="channel-dot">微</span></div><div class="conversation-copy"><div class="conversation-line"><strong>${c.name}</strong><time>${c.time}</time></div><div class="conversation-preview"><span>${c.preview}</span>${c.unread ? `<i class="unread">${c.unread}</i>` : ''}</div></div></button>`; }
const infoRow = (label, value) => `<div class="info-row"><span>${label}</span><span>${value}</span></div>`;

function customersView() {
  const query = state.customerQuery.trim().toLowerCase();
  const filtered = customers.filter(c => !query || [c.name,c.wechat,c.owner,c.school].some(v => v.toLowerCase().includes(query)));
  const selected = filtered[0] || customers[0];
  return `${pageHead('Customers', '客户管理', '按昵称、备注名模糊搜索；添加记录永久保留，用于判断最早归属。', `<button class="btn">${icon('filter')} 高级筛选</button><button class="btn btn-primary" data-toast="已打开新增客户演示">${icon('plus')} 新增客户</button>`)}
    <div class="customer-layout">
      <div class="card customer-list-card">
        <div class="search">${icon('search')}<input id="customer-search" value="${state.customerQuery}" placeholder="昵称、备注名、微信号" /></div>
        <div class="customer-list" id="customer-list">
          ${filtered.length ? filtered.map((c,i) => `<button class="customer-list-item ${i === 0 ? 'active' : ''}"><div class="conversation-avatar" style="--avatar-bg:${c.color}">${c.short}<span class="channel-dot">微</span></div><div class="conversation-copy"><div class="conversation-line"><strong>${c.name}</strong><span class="status ${c.status === '已成交' ? 'status-success' : c.status === '待跟进' ? 'status-wait' : 'status-neutral'}">${c.status}</span></div><div class="conversation-preview"><span>${c.school} · ${c.owner}</span></div></div></button>`).join('') : `<div class="empty"><div><div class="empty-mark">${icon('search')}</div><strong>没有匹配客户</strong><span>可尝试昵称、备注名或微信号的部分字符</span></div></div>`}
        </div>
      </div>
      ${customerDetail(selected)}
    </div>`;
}

function customerDetail(c) {
  const firstAccount = c.owner === '刘芸' ? '02' : c.owner === '莎莎' ? '03' : '04';
  const secondaryOwner = c.owner === '刘芸' ? '莎莎' : '刘芸';
  const secondaryAccount = firstAccount === '02' ? '03' : '02';
  return `<div class="card customer-detail">
    <div class="customer-hero"><div class="hero-person"><div class="profile-avatar" style="background:${c.color}">${c.short}</div><div><h3>${c.name}</h3><div class="hero-meta"><span>微信号 ${c.wechat}</span><span>·</span><span>归属销售 ${c.owner}</span><span class="status status-success">${c.status}</span></div></div></div><div class="hero-actions"><button class="btn" data-modal="handover">${icon('userCheck')} 发起交接</button><button class="btn btn-primary" data-route="chat">${icon('message')} 发起会话</button></div></div>
    <div class="detail-grid">
      <div class="detail-column">
        <div class="detail-block"><div class="detail-title"><strong>基本信息</strong><span>资料来自企微客户档案</span></div><div class="info-grid"><div class="info-cell"><span>客户备注名</span><strong>${c.name}（家长）</strong></div><div class="info-cell"><span>微信昵称</span><strong>${c.name.slice(0,1)}妈</strong></div><div class="info-cell"><span>年级</span><strong>${c.grade}</strong></div><div class="info-cell"><span>所在省份</span><strong>${c.province}</strong></div><div class="info-cell"><span>院校</span><strong>${c.school}</strong></div><div class="info-cell"><span>手机号</span><strong>138****7621</strong></div></div></div>
        <div class="detail-block"><div class="detail-title"><strong>客户标签</strong><button class="link-btn">编辑标签</button></div><div class="tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}<span class="tag">已签合同</span></div></div>
        <div class="detail-block"><div class="detail-title"><strong>成交记录</strong><span>2 笔 · 累计 ¥24,600</span></div><div class="order-mini"><div><strong>高三数学冲刺 + 联报</strong><span>2026-11-06 · 警然教育 · 待确认</span></div><b>¥16,800</b></div><div class="order-mini"><div><strong>暑期数学强化班</strong><span>2026-07-18 · 警然教育 · 已确认</span></div><b>¥7,800</b></div></div>
      </div>
      <div class="detail-column">
        <div class="detail-block"><div class="detail-title"><strong>添加记录</strong><span>永久保留 · 不可删除</span></div><div class="record-timeline"><div class="record-node first" style="--node:#08a883"><strong>企微 ${firstAccount}号 · ${c.owner}</strong><span>2025-07-11 11:23:09<br/>账号：wxwork_${firstAccount}</span><div class="record-actions"><button class="btn btn-sm" data-route="chat">打开会话</button></div></div><div class="record-node" style="--node:#e69324"><strong>企微 ${secondaryAccount}号 · ${secondaryOwner}</strong><span>2026-11-05 16:18:32<br/>识别为重复添加，等待交回原销售</span><div class="record-actions"><button class="btn btn-sm" data-modal="handover">发起交接</button></div></div></div></div>
        <div class="detail-block"><div class="detail-title"><strong>跟进记录</strong><button class="link-btn">+ 添加跟进</button></div>${activity('发送课程与合同信息',`由${c.owner}通过企微 ${firstAccount}号发送`,'今天 10:18','#5b5bd6')}${activity('确认数学冲刺需求','目标：压轴题提分','今天 10:10','#08a883')}${activity(`客户重新添加企微 ${secondaryAccount}号`,'系统识别为老客户','昨天','#e69324')}</div>
      </div>
    </div>
  </div>`;
}

function transactionsView() {
  const rows = state.role === 'sales' ? deals.filter(d => d.owner === '刘芸') : deals;
  const withNew = state.newDeal ? [{ id:'CJ202611060099', student:'周念', wechat:'nian_2026', package:'高三数学冲刺 + 联报', owner:'刘芸', company:'警然教育', amount:'¥16,800', paid:'刚刚', status:'待财务确认' }, ...rows] : rows;
  return `${pageHead('Transactions', '成交管理', state.role === 'admin' ? '统一管理成交、分期、退费与作废记录。' : '仅展示本人名下成交记录，财务确认前不计入业绩。', `<button class="btn">${icon('export')} 导出当前结果</button><button class="btn btn-primary" data-route="deal">${icon('plus')} 录入成交</button>`)}
    <div class="toolbar"><div class="filters"><div class="search" style="width:220px">${icon('search')}<input placeholder="学员姓名 / 微信昵称" /></div><select class="field-inline"><option>全部状态</option><option>待财务确认</option><option>已确认</option><option>分期中</option></select>${state.role === 'admin' ? '<select class="field-inline"><option>全部销售</option><option>刘芸</option><option>莎莎</option><option>双燕</option></select>' : ''}<input class="field-inline" type="date" value="2026-11-01" /><span>至</span><input class="field-inline" type="date" value="2026-11-06" /></div><button class="btn btn-primary btn-sm">查询</button></div>
    <div class="card table-card"><table class="data-table"><thead><tr><th>成交编号</th><th>学员 / 微信</th><th>班型 / 套餐</th><th>归属销售</th><th>收款主体</th><th>金额</th><th>付款时间</th><th>状态</th><th>操作</th></tr></thead><tbody>
      ${withNew.map(d => `<tr><td>${d.id}</td><td><div class="table-person"><span class="mini-avatar" style="--avatar:#6d74d4">${d.student.slice(0,1)}</span><div><strong>${d.student}</strong><span>${d.wechat}</span></div></div></td><td>${d.package}</td><td>${d.owner}</td><td>${d.company}</td><td><strong>${d.amount}</strong></td><td>${d.paid}</td><td>${dealStatus(d.status)}</td><td><button class="link-btn" data-toast="已打开成交详情">详情</button><button class="link-btn" data-modal="void">作废</button></td></tr>`).join('')}
    </tbody></table><div class="pagination"><span>共 ${withNew.length} 条记录</span><div class="page-buttons"><button>‹</button><button class="active">1</button><button>2</button><button>›</button></div></div></div>`;
}

function dealStatus(status) {
  const cls = status === '已确认' ? 'status-success' : status.includes('待') || status.includes('分期') ? 'status-wait' : status.includes('退费') ? 'status-danger' : 'status-neutral';
  return `<span class="status ${cls}">${status}</span>`;
}

function dealFormView() {
  return `<div class="form-shell">
    ${pageHead('New transaction', '录入成交', '客户信息自动关联企微档案，提交后进入财务确认。', `<button class="btn" data-route="transactions">返回列表</button>`)}
    <div class="stepper"><div class="step active"><span class="step-no">1</span>填写成交信息</div><span class="step-line"></span><div class="step"><span class="step-no">2</span>提交财务确认</div><span class="step-line"></span><div class="step"><span class="step-no">3</span>计入业绩</div></div>
    <form id="deal-form">
      <div class="card form-card"><div class="form-section-head"><span class="form-section-no">01</span><strong>客户信息</strong><span>已关联企微客户档案，减少重复录入</span></div><div class="form-grid">
        ${formField('关联客户','<select required><option>周念（微信：nian_2026）</option><option>陈一诺家长</option></select>','required')}
        ${formField('学员姓名','<input value="周念" required />','required')}
        ${formField('微信昵称','<input value="念" required />','required')}
        ${formField('年级','<select required><option>高三</option><option>高二</option><option>高一</option></select>','required')}
        ${formField('所在省份','<select required><option>江苏省</option><option>浙江省</option><option>上海市</option></select>','required')}
        ${formField('院校','<input value="南京外国语学校" required />','required')}
      </div></div>
      <div class="card form-card"><div class="form-section-head"><span class="form-section-no">02</span><strong>报名与收款</strong><span>支持多班连报与多个收款主体</span></div><div class="form-grid">
        ${formField('报名班型','<select required><option>高三数学冲刺班</option><option>高三英语强化班</option></select>','required')}
        <div class="form-field wide"><label>套餐 / 连报<span class="required">*</span></label><div class="package-box"><span class="package-chip">高三数学冲刺 ×</span><span class="package-chip">英语联报 ×</span><button type="button" data-toast="已打开套餐选择演示">+ 添加班级</button></div><div class="field-hint">一个学员可选择多个班级，系统自动统计连报占比。</div></div>
        ${formField('成交金额','<input type="number" value="16800" required />','required')}
        ${formField('付款时间','<input type="datetime-local" value="2026-11-06T10:12" required />','required')}
        ${formField('收款主体','<select required><option>警然教育科技有限公司</option><option>知行教育咨询有限公司</option></select>','required')}
        ${formField('付款方式','<select required><option>微信支付</option><option>支付宝</option><option>银行转账</option></select>','required')}
        ${formField('归属销售','<input value="刘芸（由最早添加记录自动判定）" disabled />')}
        ${formField('最早添加记录','<input value="企微 02号 · 2025-07-11 11:23" disabled />')}
      </div></div>
      <div class="card form-card"><div class="form-section-head"><span class="form-section-no">03</span><strong>合同与备注</strong><span>支持纸质合同和电子合同</span></div><div class="form-grid">
        ${formField('合同类型','<select><option>电子合同</option><option>纸质合同</option><option>暂未签署</option></select>')}
        ${formField('合同状态','<select><option>已签署</option><option>待签署</option><option>已寄回</option></select>')}
        <div class="form-field"><label>合同附件</label><div class="upload-box">${icon('upload')}<span>点击上传合同文件</span></div></div>
        ${formField('备注','<textarea placeholder="选填，请勿填写银行卡号等敏感信息">客户一次性付清，合同已在线签署。</textarea>','full')}
      </div></div>
      <div class="form-actions"><div class="form-summary">本单应收<strong>¥16,800</strong></div><div><button type="button" class="btn" data-toast="草稿已保存">保存草稿</button> <button type="submit" class="btn btn-primary">提交财务确认</button></div></div>
    </form>
  </div>`;
}

function formField(label, control, extra = '') {
  const wideClass = extra.includes('full') ? 'full' : extra.includes('wide') ? 'wide' : '';
  return `<div class="form-field ${wideClass}"><label>${label}${extra.includes('required') ? '<span class="required">*</span>' : ''}</label>${control}</div>`;
}

function approvalsView() {
  const active = approvals[state.activeApproval] || approvals[0];
  return `${pageHead('Approvals', '审批中心', '统一处理到账确认、退费、订单作废与客户交接，所有动作保留审计记录。', `<button class="btn">${icon('filter')} 筛选</button>`)}
    <div class="approval-shell">
      <div class="card table-card"><div class="approval-tabs"><button class="active">全部待办<i>6</i></button><button>财务确认<i>3</i></button><button>退费<i>2</i></button><button>作废<i>1</i></button><button>客户交接</button></div><table class="data-table"><thead><tr><th>类型</th><th>业务编号</th><th>学员</th><th>发起人</th><th>金额</th><th>提交时间</th><th>状态</th></tr></thead><tbody>${approvals.map((a,i) => `<tr data-approval="${i}" style="cursor:pointer;${i === state.activeApproval ? 'background:#f7f7ff' : ''}"><td><span class="status ${a.type === '财务确认' ? 'status-wait' : a.type === '退费审批' ? 'status-danger' : 'status-neutral'}">${a.type}</span></td><td>${a.id}</td><td>${a.student}</td><td>${a.owner}</td><td><strong>${a.amount}</strong></td><td>${a.submitted}</td><td>${state.confirmedApprovals.has(i) ? '<span class="status status-success">已处理</span>' : '<span class="status status-wait">待处理</span>'}</td></tr>`).join('')}</tbody></table><div class="pagination"><span>共 6 条待办</span><div class="page-buttons"><button class="active">1</button></div></div></div>
      <aside class="card approval-detail"><div class="card-head"><div class="card-title">${icon('eye')} 待办详情</div><span class="status status-wait">${state.confirmedApprovals.has(state.activeApproval) ? '已处理' : '待处理'}</span></div><div class="approval-person"><span class="mini-avatar" style="--avatar:#6b74d7">${active.student.slice(0,1)}</span><div><strong>${active.student} · ${active.type}</strong><span>${active.id}</span></div></div><div class="approval-info">${infoRow('归属销售',active.owner)}${infoRow('收款主体',active.company)}${infoRow('申请金额',active.amount)}${infoRow('提交时间',active.submitted)}${infoRow('业务说明',active.desc)}</div><div class="audit-box"><strong>系统校验</strong><br/>客户最早添加账号：企微 02号<br/>归属销售：刘芸<br/>添加时间：2025-07-11 11:23:09</div><div class="detail-actions"><button class="btn btn-danger" data-toast="已退回申请人补充材料">退回</button><button class="btn btn-primary" data-confirm-approval="${state.activeApproval}" ${state.confirmedApprovals.has(state.activeApproval) ? 'disabled' : ''}>${state.confirmedApprovals.has(state.activeApproval) ? '已处理' : active.action}</button></div></aside>
    </div>`;
}

function exportView() {
  const cards = [
    ['销售业绩汇总','按销售汇总已确认业绩、笔数、人数和目标完成率。','users','#5b5bd6','#efefff'],
    ['成交与收款明细','包含学员、班型、套餐、金额、收款主体与归属销售。','deal','#08a883','#e8faf5'],
    ['分期应收与到期','查看未付尾款、分期节点以及 7 天内到期提醒。','clock','#e69324','#fff5e5'],
    ['退费与作废明细','保留申请、审批、冲减业绩与作废原因的完整记录。','refund','#e15863','#fff0f1'],
    ['客户添加记录','导出最早添加账号、添加时间与全部历史添加记录。','userCheck','#526db3','#edf1ff'],
    ['学员名单','按年级、院校、省份、班型和套餐筛选学员。','export','#9b6bb3','#f7eefb']
  ];
  return `${pageHead('Export', '数据导出', state.role === 'admin' ? '可按销售、时间、年级、院校、生源地等维度筛选并导出全部数据。' : '仅导出本人名下成交与客户数据。', `<button class="btn">${icon('clock')} 导出记录</button>`)}
    <div class="export-grid">${cards.map((c,i) => `<div class="card export-card"><div class="export-icon" style="--export-color:${c[3]};--export-bg:${c[4]}">${icon(c[2])}</div><h3>${c[0]}</h3><p>${c[1]}</p><div class="export-options"><select><option>2026年11月</option><option>2026年10月</option><option>2026年第4季度</option><option>2026年</option></select><button class="btn btn-primary btn-sm" data-export="${i}">${icon('export')} 导出</button></div></div>`).join('')}</div>
    <div class="card export-log"><div class="card-head"><div class="card-title">${icon('clock')} 最近导出</div><span class="card-note">导出操作写入审计日志</span></div><table class="data-table"><thead><tr><th>文件名称</th><th>导出人</th><th>数据范围</th><th>导出时间</th><th>状态</th></tr></thead><tbody><tr><td>成交与收款明细_2026年10月.xlsx</td><td>${state.role === 'admin' ? '管理员' : '刘芸'}</td><td>${state.role === 'admin' ? '全部销售' : '仅本人'}</td><td>2026-11-05 15:55</td><td><span class="status status-success">已完成</span></td></tr><tr><td>销售业绩汇总_2026年第4季度.xlsx</td><td>管理员</td><td>全部销售</td><td>2026-11-01 09:22</td><td><span class="status status-success">已完成</span></td></tr></tbody></table></div>`;
}

function settingsView() {
  return `${pageHead('Settings', '系统设置', '配置企微账号与销售绑定关系，并按角色控制数据范围与操作权限。', `<button class="btn btn-primary" data-modal="binding">${icon('plus')} 绑定企微账号</button>`)}
    <div class="settings-grid">
      <aside class="card settings-nav"><button class="active">${icon('link')} 账号绑定</button><button>${icon('lock')} 角色权限</button><button>${icon('target')} 月度目标</button><button>${icon('users')} 用户管理</button><button>${icon('clock')} 审计日志</button></aside>
      <div class="stack">
        <div class="card"><div class="card-head"><div><div class="card-title">${icon('link')} 企微账号绑定</div><div class="card-note">销售只可查看本人被授权账号下的会话与客户</div></div><button class="btn btn-sm" data-modal="binding">新增绑定</button></div><div class="card-body">${binding('01','企微 01号','莎莎','wxwork_01','在线')}${binding('02','企微 02号','刘芸','wxwork_02','在线')}${binding('03','企微 03号','莎莎','wxwork_03','在线')}${binding('04','企微 04号','双燕','wxwork_04','离线')}</div></div>
        <div class="card"><div class="card-head"><div><div class="card-title">${icon('lock')} 角色权限矩阵</div><div class="card-note">管理员拥有全量数据与审批权限，销售仅处理本人业务</div></div><button class="btn btn-sm" data-toast="权限配置已进入编辑模式">编辑权限</button></div><table class="data-table permission-table"><thead><tr><th>功能权限</th><th>管理员</th><th>销售主管</th><th>销售</th><th>财务</th></tr></thead><tbody>${permissionRow('查看本人会话与客户',[1,1,1,0])}${permissionRow('查看全员业绩明细',[1,1,0,0])}${permissionRow('录入成交与收款',[1,1,1,0])}${permissionRow('确认款项到账',[1,0,0,1])}${permissionRow('审批退费 / 作废',[1,0,0,0])}${permissionRow('导出全部数据',[1,1,0,1])}${permissionRow('管理账号绑定',[1,0,0,0])}</tbody></table></div>
      </div>
    </div>`;
}

const binding = (no,name,owner,id,status) => `<div class="binding-card"><div class="wecom-avatar">${no}</div><div><strong>${name} · ${owner}</strong><span>账号标识 ${id} · 最近同步 2分钟前</span></div><div><span class="status ${status === '在线' ? 'status-success' : 'status-neutral'}">${status}</span><button class="link-btn" data-toast="已打开绑定编辑">编辑</button></div></div>`;
const permissionRow = (label, values) => `<tr><td>${label}</td>${values.map(v => `<td><span class="check ${v ? '' : 'off'}">${v ? '✓' : '—'}</span></td>`).join('')}</tr>`;

function openModal(type) {
  const root = document.querySelector('#modal-root');
  const modals = {
    records: { title: '客户添加记录', body: `<div class="duplicate-alert" style="margin:0 0 16px">${icon('warning')}<div>最早添加记录决定业绩归属。记录永久保留，即使客户删除好友也不会清除。</div></div><table class="record-table"><thead><tr><th>客户</th><th>添加账号 / 销售</th><th>添加时间</th><th>操作</th></tr></thead><tbody><tr><td><strong>周念</strong><br/><span class="first-owner">最早添加</span></td><td>企微 02号<br/><span>刘芸</span></td><td>2025-07-11<br/>11:23:09</td><td><button class="btn btn-sm" data-toast="已切换至企微 02号会话">发起会话</button></td></tr><tr><td><strong>周念</strong></td><td>企微 03号<br/><span>莎莎</span></td><td>2026-11-05<br/>16:18:32</td><td><button class="btn btn-sm" data-modal="handover">发起交接</button></td></tr></tbody></table>`, foot: '<button class="btn" data-close-modal>关闭</button>' },
    handover: { title: '发起客户交接', small: true, body: `<div class="handover-flow"><div class="handover-person"><small>当前添加账号</small><strong>企微 03号 · 莎莎</strong></div><div class="handover-arrow">${icon('arrowRight')}</div><div class="handover-person"><small>最早归属账号</small><strong>企微 02号 · 刘芸</strong></div></div><div class="form-field"><label>交接备注<span class="required">*</span></label><textarea id="handover-note">这是你的老客户，已重新添加企微 03号，请继续跟进。</textarea><div class="field-hint">备注仅内部可见，客户不会收到任何通知。</div></div>`, foot: '<button class="btn" data-close-modal>取消</button><button class="btn btn-primary" data-handover-submit>确认交接</button>' },
    void: { title: '发起订单作废', small: true, body: `<div class="form-field"><label>作废原因<span class="required">*</span></label><select><option>客户信息填写错误</option><option>班型 / 套餐录入错误</option><option>重复录入</option><option>其他</option></select></div><div class="form-field" style="margin-top:14px"><label>原因说明</label><textarea placeholder="请输入具体原因"></textarea><div class="field-hint">提交后由管理员审批，原订单和操作记录将保留。</div></div>`, foot: '<button class="btn" data-close-modal>取消</button><button class="btn btn-danger" data-modal-submit="作废申请已提交，等待管理员审批">提交申请</button>' },
    binding: { title: '绑定企微账号', small: true, body: `${formField('企微账号','<select><option>企微 05号（未绑定）</option><option>企微 06号（未绑定）</option></select>','required')}<div style="height:14px"></div>${formField('授权销售','<select><option>刘芸</option><option>莎莎</option><option>双燕</option></select>','required')}<div style="height:14px"></div>${formField('数据范围','<select><option>该账号下全部会话与客户</option></select>')}<div class="duplicate-alert" style="margin:16px 0 0">${icon('warning')}<div>绑定后，该销售将立即获得此账号下的会话和客户访问权限。</div></div>`, foot: '<button class="btn" data-close-modal>取消</button><button class="btn btn-primary" data-modal-submit="企微账号绑定成功">确认绑定</button>' }
  };
  const modal = modals[type];
  if (!modal) return;
  root.innerHTML = `<div class="modal-backdrop" data-backdrop><div class="modal ${modal.small ? 'modal-sm' : ''}" role="dialog" aria-modal="true"><div class="modal-head"><div class="modal-title">${modal.title}</div><button class="modal-close" data-close-modal>${icon('close')}</button></div><div class="modal-body">${modal.body}</div><div class="modal-foot">${modal.foot}</div></div></div>`;
}

function closeModal() { document.querySelector('#modal-root').innerHTML = ''; }

function showToast(message) {
  const root = document.querySelector('#toast-root');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-icon">✓</span><span>${message}</span>`;
  root.appendChild(el);
  window.setTimeout(() => el.remove(), 2600);
}

function exportCsv(index) {
  const headers = ['学员姓名','微信昵称','年级','班型','套餐','付款时间','金额','收款公司','最早添加账号','最早添加时间','院校','省份','归属销售'];
  const rows = [headers, ['周念','念','高三','数学冲刺班','数学+英语联报','2026-11-06 10:12','16800','警然教育','企微02号','2025-07-11 11:23','南京外国语学校','江苏省','刘芸']];
  const csv = '\ufeff' + rows.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = `SCRM导出示例_${index + 1}.csv`; a.click(); URL.revokeObjectURL(url);
  showToast('导出任务已完成，示例文件已下载');
}

document.addEventListener('click', (event) => {
  const route = event.target.closest('[data-route]');
  if (route) { location.hash = `#/${route.dataset.route}`; return; }
  const role = event.target.closest('[data-role]');
  if (role) { state.role = role.dataset.role; location.hash = '#/dashboard'; renderShell(); showToast(`已切换为${state.role === 'admin' ? '管理员' : '销售'}视角`); return; }
  const tab = event.target.closest('[data-chat-tab]');
  if (tab) { state.chatTab = tab.dataset.chatTab; renderShell(); return; }
  const conv = event.target.closest('[data-conversation]');
  if (conv) { state.activeConversation = Number(conv.dataset.conversation); renderShell(); return; }
  const modal = event.target.closest('[data-modal]');
  if (modal) { openModal(modal.dataset.modal); return; }
  if (event.target.closest('[data-close-modal]') || (event.target.matches('[data-backdrop]'))) { closeModal(); return; }
  const toast = event.target.closest('[data-toast]');
  if (toast) { showToast(toast.dataset.toast); return; }
  const modalSubmit = event.target.closest('[data-modal-submit]');
  if (modalSubmit) { closeModal(); showToast(modalSubmit.dataset.modalSubmit); return; }
  if (event.target.closest('[data-handover-submit]')) { closeModal(); showToast('客户已交接给刘芸，客户侧无感知'); return; }
  const approval = event.target.closest('[data-approval]');
  if (approval) { state.activeApproval = Number(approval.dataset.approval); renderShell(); return; }
  const confirmApproval = event.target.closest('[data-confirm-approval]');
  if (confirmApproval) { const i = Number(confirmApproval.dataset.confirmApproval); state.confirmedApprovals.add(i); showToast(`${approvals[i].action}成功，已写入审计日志`); renderShell(); return; }
  const exportButton = event.target.closest('[data-export]');
  if (exportButton) { exportCsv(Number(exportButton.dataset.export)); return; }
  if (event.target.closest('#send-message')) { const input = document.querySelector('#chat-input'); if (input && input.value.trim()) { input.value = ''; showToast('消息已通过当前企微账号发送'); } else showToast('请输入要发送的消息'); }
});

document.addEventListener('input', (event) => {
  if (event.target.matches('#customer-search')) {
    state.customerQuery = event.target.value;
    window.clearTimeout(window.__customerSearchTimer);
    window.__customerSearchTimer = window.setTimeout(() => renderShell(), 180);
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.matches('#deal-form')) {
    event.preventDefault();
    state.newDeal = true;
    showToast('成交单已提交，等待财务确认');
    window.setTimeout(() => { location.hash = '#/transactions'; }, 450);
  }
});

window.addEventListener('hashchange', renderShell);
if (!location.hash) location.hash = '#/dashboard';
renderShell();
