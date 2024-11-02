import { ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { updatedUserResponseExample, notFoundResponseExample, multipleUsersResponseExample, userResponseExample } from '../utils/responses.utils';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export function ApiCreateUser() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'Successful response with user data',
            schema: { example: userResponseExample },
        }),
        ApiBody({ type: CreateUserDto }),
    );
}

export function ApiFindAllUsers() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successful response with users data',
            schema: { example: multipleUsersResponseExample },
        }),
    );
}

export function ApiFindOneUser() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successful response with user data',
            schema: { example: userResponseExample },
        }),
        ApiResponse({
            status: 404,
            description: 'Failed response with user not found',
            schema: { example: notFoundResponseExample },
        }),
    );
}

export function ApiUpdateUser() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiBody({ type: UpdateUserDto }),
        ApiResponse({
            status: 200,
            description: 'Successful response with user update',
            schema: { example: updatedUserResponseExample },
        }),
        ApiResponse({
            status: 404,
            description: 'Failed response with user not found',
            schema: { example: notFoundResponseExample },
        }),
    );
}

export function ApiDeleteUser() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiResponse({
            status: 204,
            description: 'Successful response with user delete',
        }),
        ApiResponse({
            status: 404,
            description: 'Failed response with user not found',
            schema: { example: notFoundResponseExample },
        }),
    );
}
