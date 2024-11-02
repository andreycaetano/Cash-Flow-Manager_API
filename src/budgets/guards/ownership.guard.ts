import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { BudgetsService } from "../budgets.service";

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor (
        private readonly userService: UserService,
        private readonly budgetService: BudgetsService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.id;
        const budgetId = request.params.budgetId;

        if (!request.user) {
            throw new ForbiddenException('User authentication required');
        };

        const user = await this.userService.findOne(userId);
        if(!user) {
            throw new NotFoundException('User not found');
        };

        const budget = await this.budgetService.findOne(budgetId);
        if (budget.category.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access or modify this budget');
        };

        return true;
    }
}