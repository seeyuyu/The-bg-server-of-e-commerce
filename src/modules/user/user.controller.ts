import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Header,
  Query,
  UsePipes,
  Response,
  Request,
  UploadedFiles,
  UploadedFile,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { UserService } from './user.service';
import { LogService } from '../log/log.service';
import {
  CreateUserDTO,
  DeleteUserDTO,
  PutUserDTO,
  getUsersDTO,
  findOneUserDTO,
} from './dto/create_user.dto';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express/multer';
import { ValidationPipe } from '../../pipe/validation.pipe';
@Controller({ path: 'user' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Get()
  @Render('index')
  testEjs(@Request() req): any {
    // console.log(req.cookies.name, '当前的cookie');
    return { name: '哈哈' };
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<any> {
    // console.log('params is', age, name, tel);
    // console.log('this.userService.userList is', this.userService.userList);
    // const data = await this.userService.postUser({ age, name, tel });
    await this.userService.addOne(body);
    return '';
    // console.log('data is', data);
    // this.userService.userList.push(params)
    // return data;
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

  // @Get()
  // async getUsers(
  //   @Query('pageSize') pageSize: number,
  //   @Query('pageNumber') pageNumber: number,
  // ): Promise<any> {
  //   const data = await this.userService.findAll();
  //   // const data = await this.userService.getUserList({ pageSize, pageNumber });
  //   // console.log('pageSize, pageNumber is', pageSize, pageNumber);
  //   // this.logService.log('the controller of getUsers');
  //   return data;
  // }

  // @Get('setCookie')
  // setCookie(@Response({ passthrough: true }) res: Response): string {
  //   const options = {
  //     expires: new Date(Date.now() + 900000),
  //     httpOnly: true,
  //   };
  //   res.cookie('name', 'django', options);
  //   return `Setting cookie test`;
  // }

  // @Get('getCookie')
  // getCookie(@Req() req: Request): string {
  //   // this.logger.log(req.cookies['name']);
  //   return `Getting cookie test.`;
  // }

  @Get()
  index(@Request() req) {
    console.log(req.cookies.name, '当前的cookie');
    return `主页`;
  }

  @Post('test')
  test(@Response() res) {
    // 如果使使用了res就不能使用return，必须使用send
    res.cookie('name', 'hello', { maxAge: 1000 * 10, httpOnly: true });
    res.send('登录页面');
    return '主页';
  }

  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('files'))
  // upload(@UploadedFiles() files): string {
  //   const result = [];
  //   // files.map((file) => {
  //   //   result.push(file);
  //   // });
  //   console.log('result is', files, result);
  //   // 如果使使用了res就不能使用return，必须使用send
  //   return `主页${result}`;
  // }

  @Post('uploads')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files', maxCount: 1 },
      { name: 'files1', maxCount: 1 },
    ]),
  )
  uploadFile(@UploadedFiles() filesMap): string {
    const result = [];
    const { files1, files } = filesMap;
    console.log('files is', files1, files);
    files.map((file) => {
      // this.logger.log(file.originalname);
      result.push(file.originalname);
    });
    return result.join(',');
  }
  @Get('/file')
  @Header('Content-Disposition', 'attachment; filename=controller.js')
  getFile() {
    const file = fs.readFileSync(join(__dirname, 'user.controller.js'));
    return file;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  UploadedFile(@UploadedFile() file) {
    // 这里的 file 已经是保存后的文件信息了，在此处做数据库处理，或者直接返回保存后的文件信息
    return file;
  }

  // @Get()
  // async userList(): Promise<any[]> {
  //   this.logService.log('controller use the userList method of service')
  //   return await this.userService.userList()
  // }
}
