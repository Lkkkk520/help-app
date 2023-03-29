export class transtion {
  constructor() {}

  public success(param) {
    return {
      msg: param.msg || '无消息',
      success: param.success || true,
      data: param.data || {},
      status: param.status || 200,
      total: param.total || 0
    }
  }
  public error(param) {
    return {
      msg: param.msg || '无消息',
      success: param.success || false,
      data: param.data || {},
      status: param.status || 500,
      total: param.total || 0
    }
  }
}