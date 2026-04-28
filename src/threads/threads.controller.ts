import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from 'src/auth/auth.guard';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Post()
  create(@Body() createThreadDto: CreateThreadDto, @Req() req) {
    return this.threadsService.create(createThreadDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Get('/my-threads')
  findMyTreads(@Req() req) {
    return this.threadsService.findMyThreads(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto, @Req() req) {
    return this.threadsService.update(id, updateThreadDto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.threadsService.remove(id, req.user.id);
  }
}
