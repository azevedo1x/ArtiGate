import { CreateUserDTO } from '../../dtos/user/createUser.dto';
import { UserRepository } from '../../../domain/repositories/user.repository'
import { User } from '../../../domain/models/user.model'
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {

constructor(private readonly repository: UserRepository) {}

 async execute(data:CreateUserDTO): Promise<User> {
    const userExists = await this.repository.findByEmail(data.email);

    if (userExists)
      throw new Error("There is already a user with this e-mail.");

    return this.repository.create(data);    
 }

}
