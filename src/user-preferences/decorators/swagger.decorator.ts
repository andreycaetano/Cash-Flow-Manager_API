import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { CreateUserPreferenceDto } from "../dto/create-user-preference.dto";

export function ApiCreatePreference() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiBody({ type: CreateUserPreferenceDto }),
        ApiResponse({
            status: 201,
            description: 'Successful response with user preferences',
            schema: {
                properties: {
                    id: { type: 'string', example: '01603077-6e5f-4069-8588-c1e83b627f0c'},
                    defaultCurrency: { type: 'string', example: 'R$' },
                    lenguage: { type: 'string', example: 'pt-BR' },
                    createdAt: { type: 'string', example: '2024-11-03T19:57:16.158Z'},
                    updatedAt: { type: 'string', example: '2024-11-03T19:57:16.158Z'}
                }
            }
        }),
    )
}

export function ApiMultiplePreference() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successful response with user preferences',
            schema: {
                example: [
                    {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        defaultCurrency: 'USD',
                        language: 'en',
                        createdAt: new Date('2024-01-01T10:00:00Z'),
                        updatedAt: new Date('2024-01-01T10:00:00Z'),
                    },
                    {
                        id: '123e4567-e89b-12d3-a456-426614174001',
                        defaultCurrency: 'EUR',
                        language: 'fr',
                        createdAt: new Date('2024-01-02T10:00:00Z'),
                        updatedAt: new Date('2024-01-02T10:00:00Z'),
                    },
                ]
            }
        })
    )
}

export function ApiPreference() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successful response with user preferences',
            schema: {
                example: {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    defaultCurrency: 'R$',
                    language: 'pt-BR',
                    user: {
                        id: "a9d8e7f6-5b4c-3d2a-1e0f-9876543210ab",
                        fName: "John",
                        lName: 'Doe',
                        email: "johndoe@example.com",
                        password: "hashedpassword123",
                        role: 'user',
                        created_at: new Date("2023-01-15T10:20:30Z"),
                        updated_at: new Date("2023-05-20T15:25:40Z"),
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            }
        }),
        ApiBearerAuth()
    )
}

export function ApiUpdatePreference() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successful response with user preferences update',
            schema: {
                example: {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    defaultCurrency: 'R$',
                    language: 'pt-BR',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            }
        }),
        ApiBody({ type: UpdateUserDto }),
        ApiBearerAuth()
    )
}

export function ApiDeletePreference() {
    return applyDecorators(
        ApiResponse({
            status: 204,
            description: 'Successful response with user preference delete'
        }),
        ApiResponse({
            status: 404,
            description: 'Failed response with user not found',
            schema: {
                example: {
                    statusCode: 404,
                    message: 'Preference not found',
                    error: 'Not Found'
                }
            }
        })
    )
}