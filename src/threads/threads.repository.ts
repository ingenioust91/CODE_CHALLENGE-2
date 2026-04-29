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

        return {
            "message" : "Thread created.",
            "data" : {
                "title" : newThreads.title,
                "content" : newThreads.content
            }
        }
    }

    async findAllThreads(){
        const allThreads = await this.prisma.thread.findMany()
        return {
            "message" : "Success",
            "data" : allThreads
        }
    }

    async findMyThreads(user_id : string){
        const myThread =  await this.prisma.thread.findMany({
            where : {user_id}
        })
        return {
            "message" : "Success",
            "data" : myThread
        }
    }

    async findThreadById(id : string){
        const thread = await this.prisma.thread.findUnique({
            where : {id}
        })

        return {
            "message" : "Success",
            "data" : thread
        }
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

        return {
            "message" : "Thread successfully updated",
            "data" : {
                "title" : updatedThread.title,
                "content" : updatedThread.content
            }
        } 
    }

    async removeThread(id : string){
        await this.prisma.thread.delete({
            where : {id}
        })

        return {
            "message" : `Thread with id ${id} has been deleted succesfully`
        }
    }

}