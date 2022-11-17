import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodblink'), UserModule, NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
