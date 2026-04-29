import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/auth/auth.repository';


@Injectable()
export class UsersService {
  constructor(private readonly authRepo: AuthRepository) {}

  async getUserProfile(username:string){
    const user = await this.authRepo.findUserName(username)
    if (!user){
      throw new BadRequestException('Username doesnt exist')
    }

    return {
        "message" : "Success",
        "data" : {
                id : user.id,
                email : user.email,
                username : user.username,
                created_at : user.created_at
            }
    }
  }
}
