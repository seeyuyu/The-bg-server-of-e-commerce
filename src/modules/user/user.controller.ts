import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
// import { LogService } from '../log/log.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, // private readonly logService: LogService,
  ) {}
  @Post()
  user(
    @Body('age') age: any,
    @Body('name') name: any,
    @Body('tel') tel: any,
  ): string {
    console.log('params is', age, name, tel);
    console.log('this.userService.userList is', this.userService.userList);
    // this.userService.userList.push(params)
    return 'heheda';
  }

  // @Get()
  // hello(): string {
  //   this.logService.log('the controller of hello')
  //   return 'hello world'
  // }

  // @Get()
  // async userList(): Promise<any[]> {
  //   this.logService.log('controller use the userList method of service')
  //   return await this.userService.userList()
  // }
}
