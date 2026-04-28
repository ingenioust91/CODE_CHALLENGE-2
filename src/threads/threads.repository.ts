import { Injectable } from "@nestjs/common";
import { CreateThreadDto } from "./dto/create-thread.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateThreadDto } from "./dto/update-thread.dto";

@Injectable()
export class ThreadsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createThreads(dto: CreateThreadDto, user_id : string){
        const newThreads = await this.prisma.thread.create({
            data : {
                user_id : user_id,
                ...dto}
        })

        return newThreads
    }

    async findAllThreads(){
        return await this.prisma.thread.findMany()
    }

    async findMyThreads(user_id : string){
        return await this.prisma.thread.findMany({
            where : {user_id}
        })
    }

    async findThreadById(id : string){
        const thread = await this.prisma.thread.findUnique({
            where : {id}
        })

        return thread
    }

    async findMyThreadbyId(id : string, user_id : string){
        const myThread = await this.prisma.thread.findUnique({
            where : {id, user_id}
        })

        return myThread
    }

    async updatedThread(dto : UpdateThreadDto, id : string){
        const updatedThread = await this.prisma.thread.update({
            where : {id},
            data : dto
        })

        return updatedThread
    }

    async removeThread(id : string){
        await this.prisma.thread.delete({
            where : {id}
        })

        return `Thread with id ${id} has been deleted succesfully`
    }

}