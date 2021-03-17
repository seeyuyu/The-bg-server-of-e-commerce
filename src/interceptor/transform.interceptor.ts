import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';
import { Observable } from 'rxjs';

// 拦截器，拦截response，并且打印日志
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return next.handle();
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${JSON.stringify(data.data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return data;
      }),
    );
  }
}
