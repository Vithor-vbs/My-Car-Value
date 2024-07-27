import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator( // get session id
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()

        return request.currentUser
    }
)