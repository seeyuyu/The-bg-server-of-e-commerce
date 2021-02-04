import { Controller, Get } from '@nestjs/common';
// import { UserService } from './user.service'
import { LogService } from '../log/log.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly logService: LogService,
  ) { }

  @Get()
   hello(): string {
    this.logService.log('the controller of hello')
    return 'hello world'
  }
  // @Get()
  // async userList(): Promise<any[]> {
  //   this.logService.log('controller use the userList method of service')
  //   return await this.userService.userList()
  // }
}
