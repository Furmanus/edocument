import { Controller, Get, Session, Res } from '@nestjs/common';
import { IApplicationSession } from '../common/interfaces/interfaces';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  @Get()
  public loginPage(
    @Session() session: IApplicationSession,
    @Res() response: Response,
  ): void {
    if (session.userName) {
      return response.redirect('/app');
    }

    return response.render('login');
  }
}
