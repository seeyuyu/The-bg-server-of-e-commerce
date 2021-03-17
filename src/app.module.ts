import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://39.107.68.213:27000/nest'),
    UserModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
