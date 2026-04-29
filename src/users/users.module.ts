import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthRepository } from 'src/auth/auth.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthRepository],
})
export class UsersModule {}
