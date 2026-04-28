import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { ThreadsRepository } from './threads.repository';
import { AuthRepository } from 'src/auth/auth.repository';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository, AuthRepository],
})
export class ThreadsModule {}
