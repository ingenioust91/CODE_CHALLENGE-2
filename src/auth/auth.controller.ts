import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() dto: CreateUserDto) {
    return this.authService.create(dto);
  }

  @Post('/login')
  login(@Body() dto: LogInDto) {
    return this.authService.login(dto);
  }

  @Get(':username')
  getUser(@Param('username') username:string) {
    return this.authService.getUserProfile(username);
  }


}
