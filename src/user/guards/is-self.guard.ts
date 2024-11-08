import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class IsSelfGuard implements CanActivate {
    constructor(
        private readonly userService: UserService
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const currentUser = request.user;
        const userId = request.params.id;

        if (!currentUser || !userId) {
            throw new ForbiddenException('User authentication required');
        }

        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        };

        if (currentUser.id !== user.id) {
            throw new ForbiddenException('You do not have the required permissions to access this user.')
        }

        return true
    }
}