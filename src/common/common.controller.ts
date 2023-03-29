import { CommonService } from './common.service';
import { Controller, Get, Post, Query, UploadedFile, UseInterceptors, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
let path = require('path')
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from "../utils/file-uploading.utils";

@Controller('common')
@ApiTags('通用')
export class CommonController {
  constructor(private commonService: CommonService) {}
  
  @Get('avater')
  @ApiOperation({
    summary: '获取图片'
  })
  async getPic(@Query() query): Promise<any> {
    // if (query) return query
    // else return 'nothing'
    let filePath = path.join(__dirname, '../../', 'public/imgs/' + query.imgUrl)
    return filePath
  }
  /**
   * 文件上传
  */ 
  @Post('upload')
  @ApiOperation({
    summary: '文件上传'
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './images',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async upload(@UploadedFile() file) {
    console.log(123)
    return this.commonService.success(`http://192.168.0.123:3000/common/${file.filename}`)
    // let result = await this.commonService.upload(file);
    // return result;
  }
  // 获取图片的接口
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images' });
  }
}
