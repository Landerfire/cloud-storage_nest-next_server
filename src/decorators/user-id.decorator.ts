import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user?.id ? Number(req.user.id) : null;
  },
);
