import { 
  Body, Controller, Get, HttpCode, Post, Req, Param, Put, Delete, Query, Res, HttpStatus
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Request,Response } from 'express';
import { ListAllEntities, UpdateCatDto, event } from './dto';

@Controller()
@ApiTags('事件')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getEvents')
  @ApiOperation({
    summary: '获取发布事件列表'
  })
  async getEvents(@Query('id') query: any): Promise<string> {
    let results = await this.appService.getEvents(query, null)
    return results
  }

  @Post('addEvent')
  @ApiOperation({
    summary: '发布事件'
  })
  async addEvent(@Body() body: event): Promise<any> {
    let res =  await this.appService.addEvent(body)
    return res;
  }

  @Get('getDataById')
  findOne(@Query() query) {
    
    return {
      code: 200,
      message: "success",
      data: {}
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.appService.removeEvent(id)
    return {
      delete: id,
      success: true
    }
  }
}