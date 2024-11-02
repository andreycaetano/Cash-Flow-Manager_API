import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthRequest } from './interfaces/auth-request.interface';
import { LoginRequestBody } from './models/login-request-body.model';
import { loginResponse } from './utils/responses/login-examples.response';
import { ApiLogin } from './decorators/swagger.decorator';

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
