import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogModule } from '../log/log.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    LogModule.forRoot('user'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
