import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BodyWithFiles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return {
      ...request.body,
      files: request.files,
      userId: request.session.userId,
    };
  },
);
