import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { loginResponse } from "../utils/responses/login-examples.response";
import { LoginRequestBody } from "../models/login-request-body.model";

export function ApiLogin() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successful response with login user',
            schema: {
                example: loginResponse
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Failed response with login user unautorized'
        }),
        ApiBody({ type: LoginRequestBody })
    )
}