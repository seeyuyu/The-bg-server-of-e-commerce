import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { HttpExecptionFilter } from './filter/http-execption.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AllExceptionsFilter } from './filter/any-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 使用全局拦截器打印response
  app.useGlobalInterceptors(new TransformInterceptor());
  // 使用全局过滤器捕获其他 exception
  app.useGlobalFilters(new AllExceptionsFilter());
  // 使用全局过滤器打印 httpException
  app.useGlobalFilters(new HttpExecptionFilter());
  await app.listen(3000);
}
bootstrap();
