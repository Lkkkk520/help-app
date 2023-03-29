import { UserService } from './user.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { json } from 'express';
let path = require('path')
const fs = require('fs')

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('addUser')
  @ApiOperation({
    summary: '添加单个'
  })
  async addUser(@Body() param): Promise<any> {
    // console.log(obj)
    let res = await this.userService.addUser(param)
    return res
  }

  @Get('areaList')
  @ApiOperation({
    summary: '获取行政区划数据'
  })
  async getAreaList(@Query('pcode') query): Promise<any> {
    let url = ''
    if (!query) url = path.join(__dirname, '../../', 'public/json/100000.json')
    else url = `https://geo.datav.aliyun.com/areas_v3/bound/${query}_full.json`
    return url;
    // const data = await new Promise((resolve, reject) => {
    //   fs.readFile(url, 'utf-8', (err, data) => {
    //     if (err) {
    //       reject(err)
    //     }
    //     resolve(JSON.parse(data.toString()))
    //   })
    // })
    // return data
  }
}
