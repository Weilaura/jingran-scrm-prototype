// Static high-fidelity prototype contracts. All records are fictional demo data.
export const ROLES = {
  admin: { label: '管理员', scope: 'all', scopeLabel: '全部企微账号', routes: ['dashboard', 'chat', 'customers', 'followups', 'records', 'transactions', 'messages', 'groups', 'statistics', 'materials', 'phrases', 'export', 'settings'] },
  supervisor: { label: '主管', scope: 'self', scopeLabel: '授权团队', routes: ['dashboard', 'chat', 'customers', 'followups', 'records', 'transactions', 'messages', 'groups', 'statistics', 'export'] },
  sales: { label: '销售', scope: 'self', scopeLabel: '本人授权账号', routes: ['dashboard', 'chat', 'customers', 'followups', 'records', 'transactions', 'messages', 'groups', 'materials', 'phrases', 'export'] }
};

export const ROUTES = [
  { id: 'dashboard', title: '销售看板', icon: 'dashboard', description: '按到账口径查看业绩、目标完成率、成交人数与销售明细' },
  { id: 'chat', title: '会话', icon: 'message', description: '客户与群聊统一工作台，支持快捷回复、置顶与业务录入' },
  { id: 'customers', title: '客户管理', icon: 'users', description: '搜索授权账号内联系人，按时间、账号和标签筛选' },
  { id: 'followups', title: '回访管理', icon: 'clock', description: '回访计划、提醒、执行记录与逾期任务', sub: true },
  { id: 'records', title: '咨询记录', icon: 'file', description: '登记咨询项目、咨询内容和后续回访', sub: true },
  { id: 'transactions', title: '成交管理', icon: 'deal', description: '录入成交、成交截图、退费申请及合同后补' },
  { id: 'messages', title: '群发管理', icon: 'message', description: '按标签、账号或群聊创建群发任务并查看结果' },
  { id: 'groups', title: '群聊管理', icon: 'users', description: '客户群、回复账号与管理员通知' },
  { id: 'statistics', title: '项目统计', icon: 'dashboard', description: '项目成交数量、金额及销售排名' },
  { id: 'materials', title: '素材库', icon: 'image', description: '共享文件、图片与成交凭证素材' },
  { id: 'phrases', title: '快捷回复', icon: 'message', description: '创建、维护并在会话中使用个人话术' },
  { id: 'export', title: '数据导出', icon: 'export', description: '按销售、时间、年级、院校、生源地等维度导出业务数据' },
  { id: 'settings', title: '系统设置', icon: 'settings', description: '企微账号、标签同步、角色和数据范围' }
];

export const RECORD_KINDS = { consultation: '咨询记录', revisit: '回访记录' };
export const CONTENT_KINDS = { text: '文本', image: '图片', file: '文件', link: '公众号链接' };
export const TARGET_KINDS = { customers: '客户', groups: '客户群' };
export const TARGET_COLLECTIONS = { customers: 'customers', groups: 'groups' };
export const CONTENT_INPUTS = { text: 'text', link: 'link', image: 'attachment', file: 'attachment' };
export const SELECTION_ACTIONS = { true: 'add', false: 'delete' };
export const FILTER_CONTEXTS = { dashboard: 'dashboard', customers: 'customers', records: 'records', transactions: 'transactions', export: 'export', statistics: 'statistics', messages: 'messages' };
export const DIMENSIONS = [
  { key: 'grade', label: '年级' }, { key: 'province', label: '生源地' },
  { key: 'school', label: '院校' }, { key: 'account', label: '所属企微号' }
];
export const FOLLOWUP_RULES = ['今日应回访', '未来 7 天', '逾期未回访'];
// meeting_02.mp4 17:05–18:45 shows one shared payment-detail schema.
export const PAYMENT_EXPORT_FIELDS = [
  '年级', '班型', '套餐', '子类', '微信昵称', '学员', '付款日期', '金额（元）', '收款类型',
  '最早添加账号', '最早添加时间', '院校', '省份', '订单类型', '归属销售', '转介绍老师',
  '地区 / 批次', '收款方式', '合同', '归属状态', '到账状态', '来源', '录入人'
];
export const WEEKLY_INTENT_EXPORT_FIELDS = ['客户', '微信昵称', '意向阶段', '意向标签', '最近咨询项目', '最近咨询内容', '归属销售', '企微账号', '本周跟进日期', '联系电话'];
export const CONSULTATION_EXPORT_FIELDS = ['客户', '微信昵称', '咨询项目', '咨询内容', '记录类型', '登记销售', '登记时间', '下次回访', '企微账号', '客户标签'];
export const PERFORMANCE_EXPORT_FIELDS = ['销售', '成交笔数', '成交客户数', '已到账金额（元）', '目标金额（元）', '完成率', '退费金额（元）'];
export const REFUND_EXPORT_FIELDS = ['申请编号', '客户', '关联成交', '退费金额（元）', '原因', '状态', '申请时间'];
export const CUSTOMER_EXPORT_FIELDS = ['客户', '微信昵称', '联系电话', '年级', '院校', '生源地', '来源', '企微账号', '归属销售', '添加时间'];
export const EXPORTS = {
  weeklyIntent: { title: '本周意向客户', description: '销售每周汇总本周需要持续跟进的意向客户。', icon: 'users', tone: 'violet', roles: ['admin', 'supervisor', 'sales'], policy: 'records' },
  consultations: { title: '咨询记录', description: '一键导出咨询项目、咨询内容、登记销售与回访计划。', icon: 'file', tone: 'blue', roles: ['admin', 'supervisor', 'sales'], policy: 'records' },
  payments: { title: '成交与收款明细', description: '包含学员、班型、套餐、金额、收款主体与归属销售。', icon: 'deal', tone: 'teal', roles: ['admin', 'supervisor', 'sales'], policy: 'records' },
  performance: { title: '销售业绩汇总', description: '按销售汇总成交笔数、人数、到账金额与目标完成率。', icon: 'dashboard', tone: 'indigo', roles: ['admin', 'supervisor', 'sales'], policy: 'records' },
  refunds: { title: '退费与作废明细', description: '保留申请、审批、关联成交与退费原因的完整记录。', icon: 'clock', tone: 'rose', roles: ['admin', 'supervisor', 'sales'], policy: 'records' },
  customers: { title: '客户添加记录', description: '导出最早添加账号、添加时间及客户来源等信息。', icon: 'export', tone: 'purple', roles: ['admin', 'supervisor', 'sales'], policy: 'records' }
};

export const PENDING = {
  scope: '数据范围以已授权企微账号和角色权限为准。', customer: '搜索覆盖当前账号有权查看的全部企微联系人。',
  sending: '群发任务提交前需要员工再次确认，正式额度以企微接口为准。', provider: '当前为静态交互演示，未连接真实企业微信。',
  groups: '群聊与成员由已授权企微账号同步。', duplicate: '重复联系人按最早添加关系标记并进入交接流程。',
  followup: '回访计划可在会话右栏或回访管理中设置。', welcome: '欢迎语由企微规则执行。',
  records: '咨询项目和内容会沉淀到客户档案。', orders: '成交支持截图凭证；合同可在成交后补录。',
  refunds: '退费申请须关联原成交并进入审批。', performance: '业绩按已确认到账统计；退费单独统计，不直接冲减业绩。', dimensions: '人数按联系人去重。',
  materials: '本地文件仅用于原型预览。', phrases: '快捷回复在会话输入区打开。', retention: '原企微标签在首次同步时保留。', exports: '收款明细按会议视频中的统一表头导出。'
};

export const TEXT = {
  brand: '警然 SCRM', preview: '高保真交互原型', previewNote: '演示数据 · 未连接真实企微 · 所有按钮均可体验，刷新后恢复初始数据',
  pending: '说明', empty: '暂无记录', all: '全部', search: '查询', reset: '重置', cancel: '取消', save: '保存',
  addOrder: '录入成交', addRefund: '申请退费', addRecord: '新增咨询记录', addPhrase: '新增话术', edit: '编辑', remove: '删除',
  customer: '客户', customerId: '客户标识', owner: '归属销售', product: '成交产品', amount: '成交金额', date: '登记时间',
  customerSearch: '昵称、备注名、手机号或微信号', customerName: '客户姓名', tags: '客户标签', batch: '批次', groupClass: '群分类',
  sync: '资料同步', syncTypes: ['首次全量同步', '每日增量同步', '异常补查'], noSync: '同步正常', duplicate: '重复添加与交接',
  account: '企微账号', firstRelation: '最早添加关系', firstRelationPending: '系统按最早添加时间识别原销售',
  sourcePending: '资料来自已授权企业微信账号', editTags: '编辑标签', newTag: '新建标签', tagSearch: '搜索标签',
  tagPending: '上线首次同步会读取并保留企微已有标签。', selected: '已选择', add: '添加', tagEmpty: '暂无标签',
  content: '内容', recordKind: '记录类型', nextVisit: '下次回访时间', recordedBy: '登记员工', start: '开始日期', end: '结束日期',
  targets: '发送对象', targetKind: '对象类型', contentKind: '内容类型', crossTags: '支持跨标签选择', selectAll: '全选当前结果',
  submitTask: '创建群发任务', stopPending: '停止待发', taskResults: '群发任务记录', taskStatus: '状态',
  delivery: '发送前需员工确认，实际送达结果以企微回执为准。', taskEmpty: '暂无群发任务',
  groupName: '客户群', newGroupName: '修改后群名', renameGroup: '批量改名', groupResults: '改名结果',
  generateFollowup: '设置回访', followupTargets: '需要回访的客户', followupTasks: '回访任务',
  welcomeTemplate: '新客欢迎语', welcomeResults: '欢迎语记录', noEvent: '暂无新客事件', welcomeFailure: '失败会保留原因。',
  orderList: '成交记录', refundList: '退费申请', originalOrder: '原成交单', refundAmount: '退费金额',
  noOrder: '暂无成交记录', refundAssociation: '退费申请自动关联原成交单和归属销售。',
  queries: ['成交查询', '项目业绩', '咨询记录', '回访记录'], distributions: '客户分布', performance: '项目成交效能',
  totalPerformance: '总成交金额', productPerformance: '项目成交数', peoplePerformance: '成交客户数',
  count: '人数', percent: '占比', dimension: '维度', value: '取值',
  file: '文件', image: '图片', materialType: '素材类型', filename: '文件名称', fileSize: '大小', chooseFile: '选择本地文件',
  shared: '共享素材', materialNotice: '文件仅在当前浏览器预览，不会真实上传。', useMaterial: '用于群发',
  phraseTitle: '话术名称', copy: '用于回复', personal: '个人快捷回复',
  exportOrders: '导出成交明细', exportPerformance: '导出项目业绩', exportEmpty: '当前筛选范围没有记录', exportNotice: '导出使用当前筛选结果。',
  permissions: '角色与数据范围', capability: '操作', scope: '数据范围', authorization: '权限状态',
  salesScope: '本人被授权的企微账号', supervisorScope: '授权团队及成员', adminScope: '全部企微账号和系统配置',
  permissionPending: '按角色授权', boundaries: '接入说明', guards: ['发送前二次确认', '会话容量可配置', '企微原标签首次同步保留', '交接全程留痕'],
  localSaved: '已保存本地演示数据', invalid: '请检查必填内容、金额及关联对象', denied: '对象不在当前授权范围内', unavailable: '当前操作仅做界面演示',
  noAccess: '当前角色无权限', pendingTeam: '授权团队', pendingAdmin: '全部账号', noCustomers: '没有匹配客户', noGroups: '暂无客户群',
  noMaterials: '暂无素材', noPhrases: '暂无快捷回复', customerCount: '客户数', orderCount: '成交数', recordCount: '咨询与回访',
  contractWork: '业务中心', statusPending: '待处理', inScope: '授权范围', consultation: '咨询', revisit: '回访',
  amountPending: '金额待确认', matching: '当前结果', emptyValues: '暂无', localOnly: '静态原型演示', roleLabel: '切换角色', role: '角色',
  noTargets: '请选择对象', groupSource: '群聊来自已授权企微账号', close: '关闭', selectCustomer: '选择客户', orderId: '成交编号',
  refundDate: '申请时间', tagKeep: '同名标签不重复', currentActor: '当前销售'
};

export const PLACEHOLDERS = {
  query: '搜索昵称、备注名、手机号或微信号', product: '例如：高三数学冲刺班', project: '例如：2027届高考项目', amount: '例如：16800',
  refundAmount: '输入申请退费金额', name: '输入群名', title: '例如：课程咨询',
  content: '填写咨询内容或回访结果', message: '输入消息，Enter 发送', link: '粘贴公众号文章链接', attachment: '补充说明',
  welcome: '输入欢迎语', phrase: '输入常用回复内容'
};

export const CUSTOMERS = [];

export const PREVIEW_DATA = {
  role: 'admin', actorId: 'self', teamScopeStatus: 'ready', teamOwners: ['self'],
  accounts: [
    { id: 'acc-02', label: '企微 02号 · 刘芸', owner: 'self', role: '销售账号' },
    { id: 'acc-03', label: '企微 03号 · 莎莎', owner: 'self', role: '协作账号' },
    { id: 'acc-admin', label: '管理员账号', owner: 'self', role: '管理员' }
  ],
  customers: [
    { id: 'customer-zhou', name: '周念', wechat: 'nian_2027', phone: '138****7621', source: '老客转介绍', stage: '已成交', owner: 'self', ownerName: '刘芸', grade: '高三', province: '江苏省', school: '南京外国语学校', account: '企微 02号', accountId: 'acc-02', duplicateAccounts: ['企微 03号'], tags: ['26届联报', '数学冲刺', '已成交', '重要客户'], nextVisit: '2026-11-12', addedAt: '2026-11-02T03:20:00Z', groups: ['26届数学联报群', '高三冲刺A班'] },
    { id: 'customer-chen', name: '陈一诺家长', wechat: 'chenmom88', phone: '139****3368', source: '抖音直播', stage: '重点意向', owner: 'self', ownerName: '刘芸', grade: '高二', province: '浙江省', school: '杭州学军中学', account: '企微 03号', accountId: 'acc-03', tags: ['意向A', '家长', '重点跟进'], nextVisit: '2026-11-11', addedAt: '2026-11-05T06:30:00Z', groups: ['高二家长咨询群'] },
    { id: 'customer-lin', name: '林夏', wechat: 'linxia07', phone: '137****9021', source: '小红书', stage: '已成交', owner: 'self', ownerName: '刘芸', grade: '高三', province: '上海市', school: '上海中学', account: '企微 02号', accountId: 'acc-02', tags: ['数学强化', '已成交'], nextVisit: '2026-11-15', addedAt: '2026-10-28T02:00:00Z', groups: ['高三冲刺A班'] },
    { id: 'customer-yuan', name: '袁嘉乐', wechat: 'yuanjl', phone: '136****2180', source: '公众号', stage: '待跟进', owner: 'self', ownerName: '刘芸', grade: '高二', province: '湖北省', school: '武汉二中', account: '企微 03号', accountId: 'acc-03', tags: ['未回复', '待跟进'], nextVisit: '2026-11-10', addedAt: '2026-11-08T01:10:00Z', groups: [] },
    { id: 'customer-wu', name: '吴颖', wechat: 'wuying_9', phone: '135****1042', source: '线下讲座', stage: '新客户', owner: 'self', ownerName: '刘芸', grade: '高一', province: '安徽省', school: '合肥一中', account: '企微 02号', accountId: 'acc-02', tags: [], nextVisit: '2026-11-13', addedAt: '2026-11-09T04:40:00Z', groups: ['新客咨询群'] }
  ],
  conversations: [
    { id: 'conv-zhou', customerId: 'customer-zhou', name: '周念', short: '周', color: '#e88a72', type: 'direct', accountId: 'acc-02', time: '10:24', preview: '好的老师，我晚点把合同发您', unread: 2, important: true },
    { id: 'conv-group', customerId: 'customer-zhou', name: '26届联报咨询群', short: '群', color: '#4d9b8a', type: 'group', accountId: 'acc-02', time: '10:16', preview: '周念：想了解一下联报课程', unread: 8, members: 128 },
    { id: 'conv-chen', customerId: 'customer-chen', name: '陈一诺家长', short: '陈', color: '#5f83c6', type: 'direct', accountId: 'acc-03', time: '09:48', preview: '请问尾款最晚什么时候交？', unread: 1 },
    { id: 'conv-lin', customerId: 'customer-lin', name: '林夏', short: '林', color: '#ad70b1', type: 'direct', accountId: 'acc-02', time: '昨天', preview: '[图片] 这是我的成绩单', unread: 0 },
    { id: 'conv-yuan', customerId: 'customer-yuan', name: '袁嘉乐', short: '袁', color: '#d4a04f', type: 'direct', accountId: 'acc-03', time: '昨天', preview: '暂未回复', unread: 0 }
  ],
  orders: [
    { id: 'CJ202611090018', owner: 'self', customerId: 'customer-zhou', customer: '周念', customerOwner: '刘芸', project: '2027届高考项目', product: '高三数学冲刺 + 联报', classType: '联报班', package: '数学 + 英语联报', subcategory: '高考冲刺', amount: 16800, paymentType: '警然教育', orderType: '新签', referralTeacher: '王老师', regionBatch: '华东 / 26届', channel: '企业微信收款', contractStatus: '待补录', ownershipStatus: '已归属', arrivalStatus: '已到账', reviewStatus: '已确认', enteredBy: '刘芸', proofName: '微信收款截图.png', createdAt: '2026-11-09T02:12:00Z' },
    { id: 'CJ202611080061', owner: 'self', customerId: 'customer-lin', customer: '林夏', customerOwner: '刘芸', project: '2027届高考项目', product: '高三英语强化班', classType: '高级班', package: '英语强化套餐', subcategory: '英语', amount: 8800, paymentType: '警然教育', orderType: '新签', referralTeacher: '—', regionBatch: '华东 / 26届', channel: '银行转账', contractStatus: '已上传', ownershipStatus: '已归属', arrivalStatus: '已到账', reviewStatus: '已确认', enteredBy: '刘芸', proofName: '成交凭证.jpg', createdAt: '2026-11-08T09:40:00Z' },
    { id: 'CJ202611070044', owner: 'self', customerId: 'customer-chen', customer: '陈一诺家长', customerOwner: '刘芸', project: '国际课程项目', product: '英语能力提升班', classType: '会员班', package: '英语能力提升', subcategory: '国际课程', amount: 6980, paymentType: '警然教育', orderType: '续费', referralTeacher: '陈老师', regionBatch: '华东 / 27届', channel: '企业微信收款', contractStatus: '待补录', ownershipStatus: '已归属', arrivalStatus: '待确认', reviewStatus: '待财务/管理员确认', enteredBy: '刘芸', proofName: '转账截图.png', createdAt: '2026-11-07T06:21:00Z' }
  ],
  refunds: [
    { id: 'RF20261109003', owner: 'self', orderId: 'CJ202611070044', customer: '陈一诺家长', amount: 1000, reason: '课程调整', status: '审批中', createdAt: '2026-11-09T05:30:00Z' }
  ],
  records: [
    { id: 'record-a', owner: 'self', customerId: 'customer-zhou', customer: '周念', kind: 'consultation', project: '高三数学冲刺', content: '咨询压轴题提分和联报课程安排。', intentLevel: '高', grade: '高三', recordedBy: 'self', recordedByName: '刘芸', createdAt: '2026-11-09T02:00:00Z', nextVisit: '2026-11-12' },
    { id: 'record-b', owner: 'self', customerId: 'customer-zhou', customer: '周念', kind: 'revisit', project: '合同跟进', content: '已发送课程方案，等待确认合同。', intentLevel: '高', grade: '高三', recordedBy: 'self', recordedByName: '刘芸', createdAt: '2026-11-09T03:00:00Z', nextVisit: '2026-11-12' },
    { id: 'record-b2', owner: 'self', customerId: 'customer-zhou', customer: '周念', kind: 'revisit', project: '课程方案确认', content: '家长已查看课程方案，计划本周确认合同。', intentLevel: '高', grade: '高三', recordedBy: 'self', recordedByName: '刘芸', createdAt: '2026-11-10T03:00:00Z', nextVisit: '2026-11-12' },
    { id: 'record-c', owner: 'self', customerId: 'customer-chen', customer: '陈一诺家长', kind: 'consultation', project: '国际课程项目', content: '咨询英语能力提升与付款节点。', intentLevel: '中', grade: '高二', recordedBy: 'self', recordedByName: '刘芸', createdAt: '2026-11-07T06:30:00Z', nextVisit: '2026-11-11' },
    { id: 'record-d', owner: 'self', customerId: 'customer-lin', customer: '林夏', kind: 'revisit', project: '高三英语强化', content: '确认开课时间和教材寄送。', intentLevel: '中', grade: '高三', recordedBy: 'self', recordedByName: '刘芸', createdAt: '2026-11-09T01:00:00Z', nextVisit: '2026-11-15' }
  ],
  groups: [
    { id: 'group-a', name: '26届数学联报群', owner: 'self', ownerName: '刘芸', grade: '高三', groupClass: '联报班', members: 128, accountId: 'acc-02' },
    { id: 'group-b', name: '高三冲刺A班', owner: 'self', ownerName: '刘芸', grade: '高三', groupClass: '冲刺班', members: 96, accountId: 'acc-02' },
    { id: 'group-c', name: '高二家长咨询群', owner: 'self', ownerName: '刘芸', grade: '高二', groupClass: '咨询群', members: 63, accountId: 'acc-03' }
  ],
  phrases: [
    { id: 'phrase-a', owner: 'self', title: '课程介绍', content: '您好，我先为您介绍课程安排、师资和适合的学习阶段。' },
    { id: 'phrase-b', owner: 'self', title: '回访确认', content: '您好，想跟进一下上次咨询的课程，您还有哪些问题需要我协助？' },
    { id: 'phrase-c', owner: 'self', title: '合同提醒', content: '合同与课程安排已发送，请您查收，有问题随时联系我。' }
  ],
  tasks: [
    { id: 'task-a', owner: 'self', targets: '重点跟进（18人）', contentKind: 'text', content: '公开课提醒', status: '待员工确认', createdAt: '2026-11-09T04:00:00Z' },
    { id: 'task-b', owner: 'self', targets: '26届数学联报群', contentKind: 'image', attachment: { name: '课程表.png' }, status: '已完成 126/128', createdAt: '2026-11-08T04:00:00Z' }
  ],
  projectCatalog: ['2027届高考项目', '国际课程项目'],
  productCatalog: ['高三数学冲刺 + 联报', '高三英语强化班', '英语能力提升班'],
  welcome: '您好！欢迎添加警然教育，请告诉我您想咨询的年级和课程。'
};

export const COMMAND_POLICY = {
  saveOrder: 'customer', saveRecord: 'customer', saveTask: 'pending', saveTags: 'customer', saveNextVisit: 'customer',
  savePhrase: 'personal', deletePhrase: 'personal', saveWelcome: 'pending', saveRefund: 'order', submitTask: 'pending',
  stopTask: 'pending', renameGroups: 'pending', generateFollowups: 'pending', saveMaterial: 'pending'
};
