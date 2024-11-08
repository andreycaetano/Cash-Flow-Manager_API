import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { LoginRequestBody } from "../models/login-request-body.model";

export function ApiLogin() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successful response with login user',
            schema: {
                type: 'object',
                properties: {
                    access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzE2ZjIyNC1hODc4LTQ3ZDgtYjgwZi1jYmU5MDIzNzFkZjMiLCJlbWFpbCI6ImpvaG5AbWFpbC5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoidXNlciIsImlhdCI6MTczMDU2NTQ3NiwiZXhwIjoxNzMzMTU3NDc2fQ.3sEY1v2vDmgtRwghbLfIP32EitAm-uATAXW_HfjzRao'}
                }
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Failed response with login user unautorized',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer', example: 401 },
                    error: { type: 'string', example: 'Unauthorized' },
                    message: { type: 'string', example: 'Email address or password provided is incorrect.'}
                }
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Failed response with login user due to lack or error of any mandatory field ',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 400 },
                    error: { type: 'string', example: 'Bad Request' },
                    message: { type: 'array', items: { type: 'string' }, example : [
                        "The password provided does not meet the complexity requirements. Please choose a stronger password.",
                        "The password provided does not contain the minimum number of characters",
                        "The provided lName exceeds the allowed character limit.",
                        "password must be a string",
                        "password is required"
                    ]}
                }
            }
        }),
        ApiBody({ type: LoginRequestBody })
    )
}