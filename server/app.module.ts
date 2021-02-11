import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login/login.module';
import { AppController } from './app.controller';
import { UsersModule } from './common/users/users.module';

const MongoModule = MongooseModule.forRoot(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

@Module({
  controllers: [AppController],
  imports: [LoginModule, MongoModule, UsersModule],
})
export class AppModule {}
