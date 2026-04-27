import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (!user) {
            throw new UnauthorizedException('No user from JWT');
        }

        const isUser = await this.prisma.user.findUnique({
            where : {
                id :user.id
            }
        })

        if (!isUser) {
            throw new UnauthorizedException('Please login to access this route');}

        return true;
    }
} 