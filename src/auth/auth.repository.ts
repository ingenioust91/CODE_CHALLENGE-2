import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateAuthDto } from "./dto/update-auth.dto";

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) {}


    async findUserName(username:string){
        const user = await this.prisma.user.findUnique({
            where : {username}
        })

        return user
    }

    async getAllUser(){
        return await this.prisma.user.findMany()
        
    }

    async findEmail(email:string){
        const user = await this.prisma.user.findUnique({
            where : {email}
        })

        return user
    }

    async createUser(dataUser){
        const newUser = await this.prisma.user.create({
            data : dataUser
        })

        return newUser
    }

    async updateUser(id : string, dto : UpdateAuthDto){
        const updatedUser = await this.prisma.user.update({
            where : {id},
            data : dto
        })
        return updatedUser
    }

}