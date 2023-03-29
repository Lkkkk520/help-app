import { Injectable } from '@nestjs/common';
import pool from '../database';
import { transtion } from 'src/transtion';
import { profile } from 'console';
//token流程
import Token from 'src/utils/auth';

@Injectable()
export class UserService {
  private tc: any;
  private token: Token;
  constructor () {
    this.tc = new transtion()
    this.token = new Token()
  }
  async addUser (param): Promise<any> {
    // let pm =  await pool.query(`SELECT MAX(id) FROM e_user`)
    return new Promise((resolve, reject) => {
      // let query = "insert into e_user(id, sex, address, phone, score, birth, idcard, name) values ($1, $2, $3, $4, $5, $6, $7, $8)";
      let query = "insert into e_user (password, sex, address, phone, score, birth, idcard, name, profile) values ($1, $2, $3, $4, $5, $6, $7, $8, $9);select max(id, password, sex, address, phone, score, birth, idcard, name, profile) from e_user";
      let data = [param.password, param.sex, param.address, param.phone, 100, param.birth || 0, param.idCard || 0 + '', param.name, param.profile || 0]
      pool.query(query, data, (err, results) => {
          if (err) {
          //  callback(this.tc.error({}))
          reject(this.tc.error({
            msg: err.message,
          }))
        } else {
          resolve(this.tc.success({
            msg: '用户信息插入成功！',
            data: {
              token: this.token.create(results.id)
            }
          }))
          // callback(this.tc.success({}))
        }
      })
    })
  }
}
