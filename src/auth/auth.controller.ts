import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiLogin } from './decorators/swagger.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthRequest } from './interfaces/auth-request.interface';

@Controller()
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {};

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiLogin()
    async login (@Request() req: AuthRequest){
        return this.authService.login(req.user);
    };
};
