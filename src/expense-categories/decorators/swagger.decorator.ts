import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { CreateExpenseCategoryDto } from "../dto/create-expense-category.dto";
import { UpdateExpenseCategoryDto } from "../dto/update-expense-category.dto";

export function ApiCreateExpenseCategory() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'Successfuly response with expense categories',
            schema: {
                example: {
                    id: "b12f9c5a-1f4c-4c3a-9f62-8f6b6d3d9c5a",
                    name: "Food",
                    description: "Expenses related to food",
                    created_at: new Date("2023-07-01T08:00:00Z"),
                    updated_at: new Date("2023-07-01T08:00:00Z"),
                }
            }
        }),
        ApiBody({ type: CreateExpenseCategoryDto }),
        ApiBearerAuth()
    )
}

export function ApiExpenseCategories() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successfuly response with expense categories',
            schema: {
                example: [
                    {
                        id: "123e4567-e89b-12d3-a456-426614174000",
                        name: "Food",
                        description: "Expenses related to food and dining",
                        expenses: [
                            {
                                id: "expense1",
                                amount: 100.50,
                                description: "Grocery shopping",
                                date: "2024-10-01T00:00:00Z"
                            },
                            {
                                id: "expense2",
                                amount: 25.00,
                                description: "Dinner",
                                date: "2024-10-02T00:00:00Z"
                            }
                        ]
                    },
                    {
                        id: "123e4567-e89b-12d3-a456-426614174001",
                        name: "Transportation",
                        description: "Expenses related to commuting",
                        expenses: [
                            {
                                id: "expense3",
                                amount: 15.00,
                                description: "Bus ticket",
                                date: "2024-10-01T00:00:00Z"
                            }
                        ]
                    }
                ]
            }
        }),
        ApiBearerAuth()
    )
}

export function ApiExpenseCategory() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successfuly response with expense categories',
            schema: {
                example: {
                    id: "b12f9c5a-1f4c-4c3a-9f62-8f6b6d3d9c5a",
                    name: "Food",
                    description: "Expenses related to food",
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
                    created_at: new Date("2023-07-01T08:00:00Z"),
                    updated_at: new Date("2023-07-01T08:00:00Z"),
                }
            }
        }),
        ApiBearerAuth()
    )
}

export function ApiUpdateExpenseCategory() {
    return applyDecorators(
        ApiResponse({
            status: 200,
            description: 'Successfuly response with update expense categories',
            schema: {
                example: {
                    id: "b12f9c5a-1f4c-4c3a-1s8c-8f61ax7ca29c5a",
                    name: "Food",
                    description: "Expenses related to food",
                    created_at: new Date("2023-07-01T08:00:00Z"),
                    updated_at: new Date("2023-07-01T08:00:00Z"),
                }
            }
        }),
        ApiBody({ type: UpdateExpenseCategoryDto }),
        ApiBearerAuth()
    )
}

export function ApiDeleteExpenseCategory() {
    return applyDecorators(
        ApiResponse({
            status: 204,
            description: 'Successfuly response with delete expense category',
        })
    )
}