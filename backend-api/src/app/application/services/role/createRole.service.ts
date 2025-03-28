import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from '../../dtos/role/createRole.dto';
import { Role } from '../../../domain/models/role.model';
import { RoleRepository } from '../../../domain/repositories/role.repository';

@Injectable()
export class CreateRoleService {
  constructor(private readonly repository: RoleRepository) {}

  async execute(data: CreateRoleDTO): Promise<Role> {
    const roleExists = await this.repository.findByName(data.name);

    if (roleExists) throw new Error('There is already a role with this name.');

    const roleRecord = await this.repository.create(data);

    return Role.factory(roleRecord.id, roleRecord.name);
  }
}
