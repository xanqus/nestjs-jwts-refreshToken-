import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentuserId = createParamDecorator(
  (data: any, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;

    return request.user[data];
  },
);
