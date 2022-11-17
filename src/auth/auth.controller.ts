import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/user/dto/users.dto';
import {Body} from '@nestjs/common'


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: UserDto): Promise<UserDto | null> {
        return this.authService.register(user)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: UserDto): Promise<{token: string} | null> {
        return this.authService.login(user)
    }

}
