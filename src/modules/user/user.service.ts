import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async userList(): Promise<any[]> {
    return [
      {
        id: 0,
        name: '张三',
        age: 18,
        tel: '17600382086',
      },
      {
        id: 1,
        name: '李四',
        age: 18,
        tel: '17600382086',
      },
    ];
  }
}
