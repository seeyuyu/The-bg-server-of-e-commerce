import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

// 过滤器，捕获http错误，并且打印日志
@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
<<<<<<< HEAD
    Timestamp: ${new Date().toISOString()}
=======
>>>>>>> 148a5302bace6ae117e34629d38fb5c6196cd347
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    Logger.info(logFormat);
    response.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    });
  }
}
<<<<<<< HEAD
function doSomeThing(name) {
  console.log(`hello`, name);
}
function loggingDecorator(wrapped) {
  return function () {
    console.log('starting');
    const result = wrapped.apply(this, arguments);
    console.log('ending');
    return result;
  };
}
const wrapped = loggingDecorator(doSomeThing);
=======
>>>>>>> 148a5302bace6ae117e34629d38fb5c6196cd347
