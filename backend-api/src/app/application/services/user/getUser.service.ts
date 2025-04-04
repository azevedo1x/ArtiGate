import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/models/user.model';
import { UserRole } from '@prisma/client';

@Injectable()
export class GetUserService {
  constructor(private readonly repository: UserRepository) {}

  async getById(id: string): Promise<User | null> {
    const existingUser = await this.repository.findById(id);

    if (existingUser == null)
      throw new Error(`There is no user with the ID "${id}".`);

    return User.factory(
      existingUser.id,
      existingUser.name,
      existingUser.email,
      existingUser.phone,
      existingUser.homeAddressId,
      existingUser.jobAddressId,
      existingUser.badgeUrl
    );
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.findAll();

    return users.map((existingUser) =>
      User.factory(
        existingUser.id,
        existingUser.name,
        existingUser.email,
        existingUser.phone,
        existingUser.homeAddressId,
        existingUser.jobAddressId,
        existingUser.badgeUrl
      )
    );
  }

  async getAllRoles(): Promise<UserRole[]> {
    const userRoles = await this.repository.findAllRoles();

    return [...userRoles];
  }

  async getRolesByUserId(userId: string): Promise<UserRole[]> {
    const userRoles = await this.repository.findRolesByAuthorId(userId);

    return [...userRoles];
  }
}
