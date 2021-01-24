import { Controller, Get, Render } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  @Render('login')
  public loginPage(): void {}
}
