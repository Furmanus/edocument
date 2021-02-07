import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';

const MongoModule = MongooseModule.forRoot(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

@Module({
  controllers: [AppController],
  imports: [LoginModule, MongoModule],
})
export class AppModule {}
