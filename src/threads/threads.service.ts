import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly repo: ThreadsRepository, private readonly userRepo: AuthRepository) {}

 async create(createThreadDto: CreateThreadDto, user_id : string) {
    const isUser = await this.userRepo.findUserId(user_id)
    if (!isUser){
      throw new UnauthorizedException('User Not Registered')
    }
    return this.repo.createThreads(createThreadDto, user_id);
  }

  findAll() {
    return this.repo.findAllThreads();
  }

  async findMyThreads(user_id : string) {
    const isUser = await this.userRepo.findUserId(user_id)
    if (!isUser){
      throw new UnauthorizedException('User Not Registered')
    }

    return this.repo.findMyThreads(user_id)
  }

  async findOne(id : string){
    const hasThread = await this.repo.findThreadById(id)
    if (!hasThread){
      throw new BadRequestException('Thread not found')
    }

    return hasThread
  }

  async update(id: string, dto: UpdateThreadDto, user_id:string) {
    const myThreads = await this.repo.findMyThreadbyId(id, user_id)
    if (!myThreads){
      throw new BadRequestException('you are not allowed to change this thread')
    }
    return this.repo.updatedThread(dto, myThreads.id);
  }

  async remove(id: string, user_id:string) {
    const myThreads = await this.repo.findMyThreadbyId(id, user_id)
    if (!myThreads){
      throw new BadRequestException('you are not allowed to remove this thread')
    }

    return this.repo.removeThread(id);
  }
}
