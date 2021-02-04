import { Module, DynamicModule } from '@nestjs/common';
import { LogService } from './log.service';

@Module({
  // providers: [LogService],
  // exports: [LogService]
})
// 创建一个动态模块
export class LogModule {
  // register函数可以接受外部传递过来的变量或者对象
  static forRoot(prefix: string): DynamicModule {
    return {
      module: LogModule,
      providers: [
        LogService,
        // 使用useValue的方式在模块中注入一个变量,可以理解为在该模块中注入了别的模块,只是注入的方式不是采用import
        // 而是采用模块调用静态方法的方案
        {
          provide: 'PREFIX',
          useValue: prefix
        }
      ],
      // 动态模块需要暴露出去
      exports: [LogService]
    }
  }
}
