import { Injectable } from '@nestjs/common';
import pool from '../database';
import { transtion } from 'src/transtion';
import { isFileExisted } from '../utils'
let path = require('path')
const fs = require('fs')

@Injectable()
export class CommonService {
  private tc: any;
  constructor () {
    this.tc = new transtion()
  }
  async upload(file) {
    let { buffer, mimetype } = file
    let type = mimetype.split('/')[1]
    let fileName = (new Date()).getTime();
    let tf = "imgs/prifile"
    let returnPath = await isFileExisted(tf)
    let filePath = path.join(returnPath, `${fileName}.${type}`)
    let result = new Promise((resolve, reject) => {
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          reject(this.tc.error({
            msg: "图片上传失败！",
          }))
        }
        resolve(this.tc.success({
          msg: '图片上传成功！',
          data: filePath
        }))
      })
    })
    return result;
  }

  // 图片上传成功提示
  success(filePath) {
    return this.tc.success({
      msg: '图片上传成功！',
      data: filePath
    })
  }

  // 图片上传回调 =>
  static customFileName(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = "";
    if(file.mimetype.indexOf("jpeg") > -1){
        fileExtension = "jpg"
    }else if(file.mimetype.indexOf("png") > -1){
        fileExtension = "png";
    }
    const originalName = file.originalname.split(".")[0];
    cb(null, originalName + '-' + uniqueSuffix+"."+fileExtension);
  }
 
  static destinationPath(req, file, cb) {
    cb(null, './images/')
  }
}
