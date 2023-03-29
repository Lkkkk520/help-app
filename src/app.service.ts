import { connect } from 'http2';
import { Injectable, Query } from '@nestjs/common';
import pool from './database';
import { transtion } from 'src/transtion';

@Injectable()
export class AppService {
  private tc: any;
  constructor() {
    this.tc = new transtion()
  }
  getToken(): string {
    return 'token!';
  }
  // 获取事件
  async getEvents(id, opts): Promise<any> {
    let sql = ''
    if (id) sql = `SELECT * FROM events where owner = ${id} ORDER BY id`
    else sql = `SELECT * FROM events ORDER BY id`
    // 先计算一次总数
    let count = await new Promise((resolve, reject) => {
      pool.query(sql, (err, data) => {
        if (err) reject (0)
        else resolve(data.rowCount)
      })
    })
    // 根据opts来判断是否分页查询
    if (opts) {
      sql = sql +  ` limit ${opts.size} offset ${opts.size * (opts.page-1)}`
    }
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, data) => {
        if (err) reject(this.tc.error({
          msg: err.message,
        }))
        else resolve(this.tc.success({
          data: data.rows,
          total: count
        }))
      })
    })
  }
  // 删除事件
  async removeEvent (param): Promise<any> {
  }
  // 发布事件
  async addEvent(e): Promise<any> {
    let sql = 'insert into events values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
    let data = [e.id, e.title, e.descript || "暂无描述信息", e.address, e.paynum, 0, e.level, e.e_type || '普通', e.owner, -1, e.paytype || 0]
    return new Promise((resolve, reject) => {
      pool.query(sql, data, (err, results) => {
        if (err) reject(this.tc.error({
          msg: err.message,
        }))
        else resolve(this.tc.success({
          msg: '事件已创建完成！'
        }))
      })
    })
  }
}
