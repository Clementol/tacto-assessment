import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from './dto/create-auth.input';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginInput) {
        return await this.authService.login(body)
    }
}
