import { Injectable } from '@nestjs/common';
// import { fs } from 'fs';
// function readFile = function(){
//   fs.readFile(__dirname +'/user.txt')
// }
@Injectable()
export class UserService {
  private data = [
    {
      id: '0',
      name: '张三',
      age: 18,
      tel: '17600382086',
      used: true,
    },
    {
      id: '1',
      name: '李四',
      age: 18,
      tel: '17600382086',
      used: true,
    },
  ];
  private idLength = 2;

  async postUser(params): Promise<any> {
    const { age, name, tel } = params;
    const index = this.loopUser({ name });
    if (index > -1) {
      return '此用户已存在';
    } else {
      this.data.push({
        id: String(this.idLength++),
        age,
        name,
        tel,
        used: true,
      });
      return { code: 200 };
    }
  }

  async deleteUser(id): Promise<any> {
    const index = this.loopUser({ id });
    if (index > -1) {
      this.data[index].used = false;
      return { code: 204 };
    } else {
      return '不存在此用户';
    }
    return null;
  }

  async putUser(params): Promise<any> {
    const { id, age, name, tel } = params;
    const index = this.loopUser({ id });
    if (index > -1) {
      console.log('this.data[index] is', this.data[index]);
      this.data[index] = Object.assign(this.data[index], { age, name, tel });
      return { code: 200, data: { id, age, name, tel } };
    } else {
      return '不存在此用户';
    }
  }

  async getUserList({ pageSize, pageNumber }): Promise<any> {
    const curPosition = pageSize * (pageNumber - 1);
    console.log('curPosition is', curPosition);
    const usedUserLists = this.data.filter((item) => item.used);
    const total = usedUserLists.length;
    const data = usedUserLists
      .filter((item, index) => {
        return index >= curPosition && index < curPosition + pageSize;
      })
      .map((item) => {
        const { id, age, name, tel } = item;
        return { id, age, name, tel };
      });

    return { code: 200, data, total };
  }

  loopUser(params) {
    const { name, id } = params;
    const usedUserLists = this.data.filter((item) => item.used);
    const length = usedUserLists.length;
    console.log('usedUserLists is', usedUserLists);
    if (id) {
      for (let i = 0; i < length; i++) {
        console.log('usedUserLists[i].id ,id is', usedUserLists[i].id, id);
        if (usedUserLists[i].id === id) {
          return i;
        }
      }
      return -1;
    } else if (name) {
      // 判断name的时候，通常为新增元素，此时需要全量对比是否已存在
      for (let i = 0; i < length; i++) {
        if (this.data[i].name === name) {
          return i;
        }
      }
      return -1;
    } else {
      return -1;
    }
  }
}
