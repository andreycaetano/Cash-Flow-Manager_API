import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from "@nestjs/common";
import { ExpensesService } from "../expenses.service";

export class OwnershipExpenseGuard implements CanActivate {
    constructor(
        private readonly expenseSerivce: ExpensesService
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const expenseId = request.params.expenseId;

        if (!user) {
            throw new ForbiddenException('User authentication required');
        };

        if (!expenseId) {
            throw new BadRequestException('Expense id is required');
        };

        const expense = await this.expenseSerivce.findOne(expenseId);
        if (!expense) {
            throw new NotFoundException('Expense not found');
        };

        if(expense.category.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access these expense category');
        };

        return true;
    }
}