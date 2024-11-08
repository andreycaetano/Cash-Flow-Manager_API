import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export function ApiCreateUser() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'Successful response with user data',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '04a8d846-7659-4b70-a270-9810f57c50fb' },
                    fName: { type: 'string', example: 'John' },
                    lName: { type: 'string', example: 'Doe ' },
                    email: { type: 'string', example: 'john@mail.com' },
                    role: { type: 'string', example: 'user' },
                    createdAt: { type: 'string', format: 'date-time', example: '2024-11-02T05:41:55.275Z' },
                    updatedAt: { type: 'string', format: 'date-time', example: '2024-11-02T05:41:55.275Z' }
                }
            },
        }),
        ApiResponse({
            status: 409,
            description: 'Conflict - Unique constraint violation',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer', example: 409 },
                    error: { type: 'string', example: 'Conflict' },
                    message: { type: 'string', example: 'These values already exist. Please provide unique values.' },
                    field: { type: 'string', example: 'email' },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Invalid request body. The provided data does not meet the validation criteria.',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer', example: 400 },
                    error: { type: 'string', example: 'Bad Request' },
                    message: { type: 'array', items: { type: 'string' }, example: ['fName is required', "The fName provided does not contain the minimum number of characters"] },
                }
            }
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
            isArray: true,
            schema: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        fName: { type: 'string' },
                        lName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        role: { type: 'string' },
                    },
                },
                example: [{
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    fName: 'John',
                    lName: 'Doe',
                    email: 'john.doe@example.com',
                    role: 'user',
                },]
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Failed response with login user due to lack of administrator authorization',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interget', example: 403 },
                    error: { type: 'string', example: 'Forbidden' },
                    message: { type: 'string', example: 'Access restricted to administrators' }
                }
            }
        })
    );
}

export function ApiFindOneUser() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successful response with user data',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '04a8d846-7659-4b70-a270-9810f57c50fb' },
                    fName: { type: 'string', example: 'John' },
                    lName: { type: 'string', example: 'Doe ' },
                    email: { type: 'string', example: 'john@mail.com' },
                    role: { type: 'string', example: 'user' },
                    createdAt: { type: 'string', format: 'date-time', example: '2024-11-02T05:41:55.275Z' },
                    updatedAt: { type: 'string', format: 'date-time', example: '2024-11-02T05:41:55.275Z' }
                }
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Failed response with user not found',
            schema: { 
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 404 },
                    error: { type: 'string', example: 'Not Found'},
                    message: { type: 'string', example: 'User not found' }
                }
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Failed response because authentication token is invalid',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 401 },
                    error: { type: 'string', example: 'Unautorized' },
                    message: { type: 'string', example: 'Invalid token, please provide a valid token.' }
                }
            }
        }),
        ApiResponse({
            status: 403,
            description: 'Failed response because permission to access this user is required',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 403 },
                    error: { type: 'string', example: 'Forbidden' },
                    message: { type: 'string', example: 'You do not have the required permissions to access this user.'}
                }
            }
        })
    );
}

export function ApiUpdateUser() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiBody({ type: UpdateUserDto }),
        ApiResponse({
            status: 200,
            description: 'Successful response with user updated',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '04a8d846-7659-4b70-a270-9810f57c50fb' },
                    fName: { type: 'string', example: 'Mike' },
                    lName: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'mike@mail.com' },
                    role: { type: 'string', example: 'user' },
                    createdAt: { type: 'string', format: 'date-time', example: '2024-11-02T05:41:55.275Z' },
                    updatedAt: { type: 'string', format: 'date-time', example: '2024-11-02T05:41:55.275Z' }
                }
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Failed response with user not found',
            schema: { 
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 404 },
                    error: { type: 'string', example: 'Not Found'},
                    message: { type: 'string', example: 'User not found' }
                }
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Failed response because permission to access this user is required',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 403 },
                    error: { type: 'string', example: 'Forbidden' },
                    message: { type: 'string', example: 'You do not have the required permissions to access this user.'}
                }
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Failed response because authentication token is invalid',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 401 },
                    error: { type: 'string', example: 'Unautorized' },
                    message: { type: 'string', example: 'Invalid token, please provide a valid token.' }
                }
            }
        }),
        ApiResponse({
            status: 409,
            description: 'Conflict - Unique constraint violation',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer', example: 409 },
                    error: { type: 'string', example: 'Conflict' },
                    message: { type: 'string', example: 'These values already exist. Please provide unique values.' },
                    field: { type: 'string', example: 'email' },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Failed response because UUID invalid',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 400 },
                    error: { type: 'string', example: 'Bad Request' },
                    message: { type: 'string', example: 'Invalid UUID format.' }
                }
            }
        })
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
            schema: { 
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 404 },
                    error: { type: 'string', example: 'Not Found'},
                    message: { type: 'string', example: 'User not found' }
                }
            },
        }),ApiResponse({
            status: 400,
            description: 'Failed response because UUID invalid',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 400 },
                    error: { type: 'string', example: 'Bad Request' },
                    message: { type: 'string', example: 'Invalid UUID format.' }
                }
            }
        }),
        ApiResponse({
            status: 403,
            description: 'Failed response because permission to access this user is required',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 403 },
                    error: { type: 'string', example: 'Forbidden' },
                    message: { type: 'string', example: 'You do not have the required permissions to access this user.'}
                }
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Failed response because authentication token is invalid',
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'interger', example: 401 },
                    error: { type: 'string', example: 'Unautorized' },
                    message: { type: 'string', example: 'Invalid token, please provide a valid token.' }
                }
            }
        }),
    );
}
