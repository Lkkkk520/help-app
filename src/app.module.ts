import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ServeStaticModule  } from "@nestjs/serve-static";
import { CommonService } from './common/common.service';
import { CommonController } from './common/common.controller';
import { CommonModule } from './common/common.module';

// 其他
import { MulterModule } from '@nestjs/platform-express';

import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: './images',
    }),
    CommonModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, CommonService],
})
export class AppModule {}
