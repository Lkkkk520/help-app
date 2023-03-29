class Token {
  public token = ''
  private step = 30
  private tempstr = 'yqk'
  constructor() {
    this.token = '';
  }
  create(param) {
    let timestamp = new Date().getTime();
    let id = param.id + 999; // 用户id加999
    this.token = `${timestamp}/${id}/${this.step}/${this.tempstr}`
    return this.token;
  }
  check(token) {
    let arr = token.split('/')
    let oh = new Date(arr[0]).getHours()
    let om = new Date(arr[0]).getMinutes()
    let ch = new Date().getHours()
    let cm = new Date().getMinutes()
    // 计算间隔
    let duration = (ch*60 + cm) - (om*60 + om)
    if (duration > this.step) {
      return false;
    }
    return this.create(arr[1])
  }
}
export default Token;