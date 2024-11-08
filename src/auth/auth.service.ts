import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserToken } from './interfaces/user-token.interface';
import { UserPayload } from './interfaces/user-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {};

    async login (user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: `${user.fName} ${user.lName}`,
            role: user.role
        };
      
        try {
            return {
                access_token: this.jwtService.sign(payload)
              };
        } catch (error) {
            console.log(error);
        }
        
    };

    async validateUser (email: string, password: string): Promise<User> {
        const user: User = await this.userService.findByEmail(email);
        
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                };
            };
        };
        
        throw new UnauthorizedException('Email address or password provided is incorrect.');
    };
};
