import { Controller, Get, Redirect, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Redirect('/login')
  public defaultPath(): void {}
}
