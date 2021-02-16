import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { IApplicationSession } from '../../common/interfaces/interfaces';
import { Response } from 'express';

@Controller('/app')
export class ApplicationController {
  @Get('/')
  public main(
    @Session() session: IApplicationSession,
    @Res() response: Response,
  ): void {
    const { userName } = session;

    if (session.userName) {
      return response.render('app', { userName });
    }

    return response.redirect('/login');
  }

  @Post('/logout')
  @HttpCode(HttpStatus.ACCEPTED)
  public logout(@Session() session: IApplicationSession): void {
    session.destroy((err) => {
      // TODO Add logger
      console.error(err);
    });
  }
}
