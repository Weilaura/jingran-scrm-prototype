// Static prototype contracts. No enterprise authorization or provider state is asserted here.
export const ROLES = {
  admin: { label: '管理员', scope: 'pending', scopeLabel: '管理权限待确认', routes: ['customers', 'messages', 'groups', 'followups', 'welcome', 'records', 'transactions', 'statistics', 'materials', 'phrases', 'export', 'settings'] },
  supervisor: { label: '主管', scope: 'team', scopeLabel: '授权团队', routes: ['customers', 'records', 'transactions', 'statistics', 'export'] },
  sales: { label: '销售', scope: 'self', scopeLabel: '本人授权数据', routes: ['customers', 'messages', 'groups', 'followups', 'welcome', 'records', 'transactions', 'materials', 'phrases', 'export'] }
};

export const ROUTES = [
  { id: 'customers', title: '客户管理', icon: 'users', description: '客户资料、归属、标签、批次及群分类' },
  { id: 'messages', title: '发送任务', icon: 'message', description: '选择客户或群，准备内容并核对发送结果' },
  { id: 'groups', title: '群管理', icon: 'users', description: '按年级核对客户群分类与批量改名结果' },
  { id: 'followups', title: '自动回访', icon: 'clock', description: '隔日、7天、14天筛选未打标签新客并生成回访任务' },
  { id: 'welcome', title: '新客欢迎语', icon: 'message', description: '带昵称的新客欢迎语与发送记录' },
  { id: 'records', title: '咨询与回访', icon: 'file', description: '登记咨询、回访和下次回访时间，按时间查询' },
  { id: 'transactions', title: '成交与退费', icon: 'deal', description: '登记产品、金额及客户归属，退费关联原订单' },
  { id: 'statistics', title: '查询与统计', icon: 'dashboard', description: '授权团队查询、客户分布及业绩报表' },
  { id: 'materials', title: '素材库', icon: 'image', description: '系统内共享文件、图片及约定发送使用' },
  { id: 'phrases', title: '个人话术', icon: 'message', description: '创建、管理和使用本人话术' },
  { id: 'export', title: '数据导出', icon: 'export', description: '按授权范围导出约定明细与报表' },
  { id: 'settings', title: '系统设置', icon: 'settings', description: '核对账号、角色与待确认的权限范围' }
];

export const RECORD_KINDS = { consultation: '咨询记录', revisit: '回访记录' };
export const CONTENT_KINDS = { text: '文本', image: '图片', file: '文件', link: '公众号普通链接' };
export const TARGET_KINDS = { customers: '客户', groups: '客户群' };
export const TARGET_COLLECTIONS = { customers: 'customers', groups: 'groups' };
export const CONTENT_INPUTS = { text: 'text', link: 'link', image: 'attachment', file: 'attachment' };
export const SELECTION_ACTIONS = { true: 'add', false: 'delete' };
export const FILTER_CONTEXTS = { customers: 'customers', messages: 'messages', records: 'records', transactions: 'transactions', export: 'transactions', statistics: 'statistics' };
export const DIMENSIONS = [
  { key: 'grade', label: '年级' }, { key: 'province', label: '生源地' },
  { key: 'school', label: '院校' }, { key: 'account', label: '所属企微号' }
];
export const FOLLOWUP_RULES = ['隔日', '7天', '14天'];
export const EXPORTS = {
  orders: { title: '本人成交明细', roles: ['sales'], policy: 'records', headers: ['客户', '产品', '金额', '客户归属', '登记时间'] },
  performance: { title: '业绩报表', roles: ['supervisor', 'admin'], policy: 'pending', headers: [] }
};
export const PENDING = {
  scope: '主管仅查询授权团队；团队范围尚待确认。管理员具体管理权限尚待确认。',
  customer: '归属调整方式、批次规格、同步频率、标签写回范围及资料来源待确认。',
  sending: '单批量、日发送峰值、平台额度、发送权限、限额和允许链接待确认。',
  provider: '企微接入尚未验证。',
  groups: '群改名权限、接口能力、目标群及命名规则待接入验证和确认。',
  duplicate: '跨活码客户识别与分配条件待验证；核对重复客户是否仍指向最早添加员工。',
  followup: '起算点、退出规则待确认，当前不自动生成回访任务。',
  welcome: '模板数量、原欢迎语配置冲突及事件凭据有效条件待确认。',
  records: '咨询及回访的其他字段待确认。',
  orders: '订单其他字段、产品数量、修改权限、退费规则及统计口径待确认。',
  refunds: '退费权限、可退金额及登记规则待确认。',
  performance: '业绩及退费统计口径、去重规则和报表模板待确认。',
  dimensions: '维度字段取值、去重口径和占比分母待确认。',
  materials: '公共素材管理权限、格式、单文件大小及总容量待确认。公共素材仅指系统内共享。',
  phrases: '正式使用入口及话术条数待确认。',
  retention: '数据、私有文件、导出、备份和日志的保留期限待书面确认。',
  exports: '文件格式、导出字段、报表模板和单批导出量待确认。'
};

export const TEXT = {
  brand: '警然 SCRM', preview: '本地原型预览', previewNote: '全部为演示假数据，未连接企微；刷新恢复初始演示数据。',
  pending: '待确认', empty: '暂无记录', all: '全部', search: '查询', reset: '重置', cancel: '取消', save: '保存',
  addOrder: '登记成交', addRefund: '登记退费', addRecord: '添加记录', addPhrase: '新增话术', edit: '编辑', remove: '删除',
  customer: '客户', customerId: '客户标识', owner: '客户归属', product: '产品', amount: '金额', date: '登记时间',
  customerSearch: '昵称、备注名或客户标识', customerName: '昵称 / 备注名', tags: '客户标签', batch: '批次', groupClass: '群分类',
  sync: '资料同步', syncTypes: ['初次同步', '变化同步', '异常补查'], noSync: '尚无同步结果', duplicate: '防重复加粉',
  account: '所属企微号', firstRelation: '最早添加关系', firstRelationPending: '原始添加关系及时间待同步核对',
  sourcePending: '资料来源待字段映射确认', editTags: '编辑标签', newTag: '新建标签', tagSearch: '搜索标签',
  tagPending: '本地标签预览；企微写回权限与范围待确认。', selected: '已选择', add: '添加', tagEmpty: '暂无标签',
  content: '内容', recordKind: '记录类型', nextVisit: '下次回访时间', recordedBy: '登记员工', start: '开始日期', end: '结束日期',
  targets: '发送对象', targetKind: '对象类型', contentKind: '内容类型', crossTags: '跨标签全选', selectAll: '全选当前结果',
  submitTask: '提交至企微', stopPending: '停止待发', taskResults: '任务与结果', taskStatus: '状态',
  delivery: '接口受理不等于送达；停止待发不等于撤回已发送消息。', taskEmpty: '尚无发送任务',
  groupName: '客户群', newGroupName: '修改后群名', renameGroup: '批量改名', groupResults: '改名结果',
  generateFollowup: '生成回访任务', followupTargets: '未打标签新客', followupTasks: '回访任务',
  welcomeTemplate: '带昵称的新客欢迎语', welcomeResults: '欢迎语发送记录',
  noEvent: '尚无新客事件', welcomeFailure: '无有效事件凭据、超时或发送失败均须保留结果。',
  orderList: '成交记录', refundList: '退费记录', originalOrder: '原订单', refundAmount: '退费金额',
  noOrder: '请先登记成交', refundAssociation: '退费须关联原订单并按确认口径纳入统计。',
  queries: ['成交查询', '业绩流水', '咨询填写', '回访填写'], distributions: '客户人数与占比', performance: '业绩效能',
  totalPerformance: '总业绩', productPerformance: '分产品业绩', peoplePerformance: '年级、院校、生源地人数',
  count: '人数', percent: '占比', dimension: '维度', value: '取值',
  file: '文件', image: '图片', materialType: '素材类型', filename: '文件名称', fileSize: '大小', chooseFile: '选择本地素材',
  shared: '系统内共享', materialNotice: '当前仅预览本地文件；不上传、不公开文件链接。', useMaterial: '用于发送任务',
  phraseTitle: '话术名称', copy: '复制使用', personal: '仅本人管理和使用',
  exportOrders: '导出本人成交明细', exportPerformance: '导出业绩报表', exportEmpty: '当前筛选范围内没有成交记录',
  exportNotice: '本地演示导出使用当前筛选结果，不代表正式格式已确认。',
  permissions: '角色与数据范围', capability: '操作', scope: '数据范围', authorization: '权限状态',
  salesScope: '本人授权客户、记录、成交导出及个人话术', supervisorScope: '仅查询授权团队业务数据', adminScope: '账号、角色与系统配置；具体管理权限待确认',
  permissionPending: '归属调整、标签写回、退费、公共素材管理及发送权限待确认',
  boundaries: '接入与安全边界', guards: ['发送须员工确认，匿名及越权发送应被拦截', '发送限额、允许链接、重复提交保护及日志', '无效回调不驱动业务，重复事件不重复执行', '私有文件按当前登录、角色及数据权限访问', '协助配置企微可用群防骚扰规则；外部群消息不能仅靠本系统完全阻止'],
  localSaved: '已保存本地演示',
  invalid: '请检查必填内容、金额及关联对象', denied: '对象不在当前授权范围内', unavailable: '操作条件尚未确认',
  noAccess: '当前范围尚待确认，不展示业务数据', pendingTeam: '授权团队范围待确认', pendingAdmin: '管理员具体数据权限待确认',
  noCustomers: '当前范围内暂无客户', noGroups: '尚无授权客户群', noMaterials: '尚无素材', noPhrases: '尚无个人话术',
  customerCount: '授权客户', orderCount: '成交记录', recordCount: '咨询与回访',
  contractWork: '本期业务', statusPending: '尚未执行', inScope: '授权范围', consultation: '咨询', revisit: '回访',
  amountPending: '统计口径待确认', matching: '当前查询结果', emptyValues: '字段值待确认', localOnly: '仅本地演示',
  roleLabel: '切换演示角色', role: '角色', noTargets: '请选择授权范围内的客户', groupSource: '客户群及群分类待授权同步',
  close: '关闭', selectCustomer: '选择客户', orderId: '成交编号', refundDate: '退费登记时间', tagKeep: '同名标签不重复添加', currentActor: '当前账号'
};

export const PLACEHOLDERS = {
  query: '输入关键词，例如：演示客户甲',
  product: '例如：演示产品甲',
  amount: '例如：1200',
  refundAmount: '输入退费金额，例如：200',
  name: '输入拟修改的群名',
  title: '例如：咨询问候',
  content: '填写本次咨询或回访内容，例如：客户咨询了产品信息。',
  message: '输入要发送的文字，例如：您好，请问您方便什么时候沟通？',
  link: '粘贴微信公众号文章链接',
  attachment: '可填写随图片或文件发送的文字',
  welcome: '输入新客欢迎语内容',
  phrase: '例如：您好，请问您想咨询哪些产品信息？'
};

export const CUSTOMERS = [];

// Fictional display fixtures, supplied only by the local preview entry point.
export const PREVIEW_DATA = {
  role: 'sales',
  customers: [
    { id: 'demo-customer-a', name: '演示客户甲', owner: 'self', ownerName: '演示销售甲', grade: '高三', province: '江苏省', school: '演示学校甲', account: '演示企微号', tags: ['演示咨询客户'], nextVisit: '2026-11-10' },
    { id: 'demo-customer-b', name: '演示客户乙', owner: 'self', ownerName: '演示销售甲', grade: '高二', province: '浙江省', school: '演示学校乙', account: '演示企微号', tags: ['演示回访客户'], nextVisit: '2026-11-11' },
    { id: 'demo-customer-c', name: '演示客户丙', owner: 'self', ownerName: '演示销售甲', grade: '高三', province: '安徽省', school: '演示学校丙', account: '演示企微号', tags: ['演示咨询客户', '演示回访客户'], nextVisit: '2026-11-12' },
    { id: 'demo-customer-d', name: '演示客户丁', owner: 'self', ownerName: '演示销售甲', grade: '高一', province: '江苏省', school: '演示学校丁', account: '演示企微号', tags: [] },
    { id: 'demo-customer-e', name: '演示客户戊', owner: 'self', ownerName: '演示销售甲', grade: '高二', province: '浙江省', school: '演示学校戊', account: '演示企微号', tags: [] }
  ],
  orders: [
    { id: 'demo-order-a', owner: 'self', customerId: 'demo-customer-a', customer: '演示客户甲', customerOwner: '演示销售甲', product: '演示产品甲', amount: 1200, createdAt: '2026-11-06T02:00:00Z' },
    { id: 'demo-order-b', owner: 'self', customerId: 'demo-customer-b', customer: '演示客户乙', customerOwner: '演示销售甲', product: '演示产品乙', amount: 800, createdAt: '2026-11-08T06:30:00Z' },
    { id: 'demo-order-c', owner: 'self', customerId: 'demo-customer-c', customer: '演示客户丙', customerOwner: '演示销售甲', product: '演示产品甲', amount: 600, createdAt: '2026-11-09T01:30:00Z' }
  ],
  records: [
    { id: 'demo-record-a', owner: 'self', customerId: 'demo-customer-a', customer: '演示客户甲', kind: 'consultation', content: '演示记录：咨询产品信息。', recordedBy: 'self', recordedByName: '演示销售甲', createdAt: '2026-11-05T02:00:00Z', nextVisit: '2026-11-10' },
    { id: 'demo-record-b', owner: 'self', customerId: 'demo-customer-a', customer: '演示客户甲', kind: 'revisit', content: '演示记录：确认下次回访时间。', recordedBy: 'self', recordedByName: '演示销售甲', createdAt: '2026-11-09T02:00:00Z', nextVisit: '2026-11-10' },
    { id: 'demo-record-c', owner: 'self', customerId: 'demo-customer-b', customer: '演示客户乙', kind: 'consultation', content: '演示记录：记录客户咨询内容。', recordedBy: 'self', recordedByName: '演示销售甲', createdAt: '2026-11-07T06:30:00Z', nextVisit: '2026-11-11' },
    { id: 'demo-record-d', owner: 'self', customerId: 'demo-customer-c', customer: '演示客户丙', kind: 'revisit', content: '演示记录：记录本次回访内容。', recordedBy: 'self', recordedByName: '演示销售甲', createdAt: '2026-11-09T01:00:00Z', nextVisit: '2026-11-12' }
  ],
  groups: [
    { id: 'demo-group-a', name: '演示客户群甲', owner: 'self', ownerName: '演示销售甲', grade: '高三', groupClass: '演示分类甲' },
    { id: 'demo-group-b', name: '演示客户群乙', owner: 'self', ownerName: '演示销售甲', grade: '高二', groupClass: '演示分类乙' }
  ],
  phrases: [
    { id: 'demo-phrase-a', owner: 'self', title: '演示咨询话术', content: '您好，请问您想咨询哪些产品信息？' },
    { id: 'demo-phrase-b', owner: 'self', title: '演示回访话术', content: '您好，请问您方便什么时候回访？' }
  ],
  welcome: '演示客户甲，您好！欢迎添加，您可以在这里咨询产品信息。'
};

export const COMMAND_POLICY = {
  saveOrder: 'customer', saveRecord: 'customer', saveTask: 'pending', saveTags: 'pending', saveNextVisit: 'customer',
  savePhrase: 'personal', deletePhrase: 'personal', saveWelcome: 'pending',
  saveRefund: 'pending', submitTask: 'pending', stopTask: 'pending', renameGroups: 'pending',
  generateFollowups: 'pending', saveMaterial: 'pending'
};
