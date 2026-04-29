import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInDto } from './dto/login.dto';
import { UserGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('/refresh')
  refresh(@Body() body : {refresh_token : string}){
    return this.authService.getNewAccessToken(body.refresh_token);
  }
}
