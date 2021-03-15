import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LogService } from '../log/log.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Post()
  async createUser(
    @Body('age') age: number,
    @Body('name') name: string,
    @Body('tel') tel: string,
  ): Promise<any> {
    console.log('params is', age, name, tel);
    // console.log('this.userService.userList is', this.userService.userList);
    const data = await this.userService.postUser({ age, name, tel });
    // return '';
    // console.log('data is', data);
    // this.userService.userList.push(params)
    return data;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    console.log('delete id is', id);
    const data = await this.userService.deleteUser(id);
    // return '';
    // console.log('data is', data);
    return data;
  }

  @Put()
  async putUser(
    @Body('age') age: number,
    @Body('name') name: string,
    @Body('tel') tel: string,
    @Body('id') id: string,
  ): Promise<any> {
    const data = await this.userService.putUser({ id, age, name, tel });
    console.log('put  is', age, name, tel, id);
    return data;
  }

  @Get()
  async getUsers(
    @Query('pageSize') pageSize: number,
    @Query('pageNumber') pageNumber: number,
  ): Promise<any> {
    const data = await this.userService.getUserList({ pageSize, pageNumber });
    console.log('pageSize, pageNumber is', pageSize, pageNumber);
    this.logService.log('the controller of hello');
    return data;
    return '';
  }

  // @Get()
  // async userList(): Promise<any[]> {
  //   this.logService.log('controller use the userList method of service')
  //   return await this.userService.userList()
  // }
}
