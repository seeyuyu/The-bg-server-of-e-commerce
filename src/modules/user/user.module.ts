import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [LogModule.forRoot('user')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
