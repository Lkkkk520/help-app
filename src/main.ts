import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { connect } from 'http2';
import { AppModule } from './app.module';
import pool from './database'
// import uconfig from "../public/config"

async function bootstrap() {
  const listenPort = 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('同城帮')
    .setDescription('')
    .setVersion('1.0')
    // .addTag('Lkg')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`正在监听 http://localhost:${listenPort}`);
  // connectPg()
  //开启跨域设置
  // app.enableCors({
  //   allowedHeaders:"*",
  //   origin: "*"
  // });
  await app.listen(listenPort);
}
bootstrap();