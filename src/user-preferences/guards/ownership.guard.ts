import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UserPreferencesService } from "../user-preferences.service";

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor (
        private readonly userPreferenceService: UserPreferencesService
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const preferenceId = request.params.id

        if (!user) {
            throw new ForbiddenException('User authentication required');
        }

        if (!preferenceId) {
            throw new BadRequestException('Preference Id is required');
        }

        const preference = await this.userPreferenceService.findOne(preferenceId);
        if (!preference) {
            throw new NotFoundException('Preference not found')
        }

        if (preference.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access these preferences')
        }

        return true
    }
}