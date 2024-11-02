import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ExpenseCategoriesService } from "../expense-categories.service";

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private readonly categoryService: ExpenseCategoriesService
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const categoryId = request.params.id;

        if (!user) {
            throw new ForbiddenException('User authentication required');
        };

        if (!categoryId) {
            throw new BadRequestException('Expense category id is required');
        };

        const category = await this.categoryService.findOne(categoryId);
        if (!category) {
            throw new NotFoundException('Expense category not found');
        };

        if (category.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access these expense category');
        };

        return true;
    }
}