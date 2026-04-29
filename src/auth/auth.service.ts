import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly repo: AuthRepository, private jwtService: JwtService) {}

  async create(dto: CreateUserDto) {
    const hasUser = await this.repo.findUserName(dto.username)
    if (hasUser){
      throw new BadRequestException('Username already exist')
    }

    const hasEmail = await this.repo.findEmail(dto.email)
    if (hasEmail){
      throw new BadRequestException('Email already registered')
    }

    const password_hash = await bcrypt.hash(dto.password,10)

    const newUser = {
      username : dto.username,
      email : dto.email,
      password_hash : password_hash,
    }

    return this.repo.createUser(newUser);
  }

  async login(dto:LogInDto){
    const isUser = await this.repo.findEmail(dto.email)
    if (!isUser){
      throw new UnauthorizedException('Email Not Registered')
    }

    const isValid = await bcrypt.compare(dto.password, isUser.password_hash);
    if (!isValid) {
        throw new UnauthorizedException('Wrong password');
    }

    const payload ={
        id : isUser.id,
        username : isUser.username,
    }

    const accesstoken = await this.jwtService.signAsync(payload,
                        {  expiresIn: '1h', secret: process.env.JWT_SECRET });
    const refreshtoken = await this.jwtService.signAsync(payload,
                        {  expiresIn: '7d', secret: process.env.REFRESH_TOKEN_SECRET })

    await this.repo.updateUser(isUser.id, {refresh_token : await bcrypt.hash(refreshtoken,10)})

    return {
        message: 'Login success',
        access_token: accesstoken,
        refresh_token : refreshtoken
      };

  }

  async getNewAccessToken(refresh_token:string){
    let payload
    try{
      payload = this.jwtService.verifyAsync(refresh_token, {secret:process.env.REFRESH_TOKEN_SECRET})
    }
    catch(e){
      throw new UnauthorizedException('Token expired or invalid');
    }

    const isUser = await this.repo.findUserId(payload.id)

    if (!isUser || !isUser.refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isMatch = await bcrypt.compare(isUser.refresh_token, refresh_token);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h', secret: process.env.JWT_SECRET,
    });

    return { accessToken: newAccessToken };
  }

  async getUserProfile(username:string){
    const user = await this.repo.findUserName(username)
    if (!user){
      throw new BadRequestException('Username doesnt exist')
    }

    return {
      id : user.id,
      email : user.email,
      username : user.username,
      created_at : user.created_at
    }
  }

}
