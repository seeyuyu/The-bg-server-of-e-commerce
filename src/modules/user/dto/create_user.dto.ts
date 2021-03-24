<<<<<<< HEAD
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
=======
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
>>>>>>> 148a5302bace6ae117e34629d38fb5c6196cd347
export class CreateUserDTO {
  @IsString({ message: '真实姓名必须是 String 类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string | number;

  @IsString()
  readonly age?: string;

<<<<<<< HEAD
  @MinLength(6, { message: '密码长度不能小于6位数' })
  @MaxLength(20, { message: '密码长度大于20位数' })
=======
>>>>>>> 148a5302bace6ae117e34629d38fb5c6196cd347
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString()
  readonly tel: string;
  readonly roles?: [string | number];
}

export class DeleteUserDTO {
  readonly _id: string;
}

export class PutUserDTO {
  readonly _id: string;
  readonly name: string | number;
  readonly age: string;
  readonly password: string;
  readonly tel: number;
}

export class getUsersDTO {
  readonly _id: string;
}

export class findOneUserDTO {
  readonly _id: string;
}
