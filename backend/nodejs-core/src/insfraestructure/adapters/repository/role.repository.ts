import { DBConfig } from "../../../shared/config/config-db";
import { Role } from "../../../domain/entity";
import { RoleRepository } from "../../../domain/repository/role.repository";

export class RoleImplement implements RoleRepository {
  async create(role: Partial<Role>): Promise<Role> {
    const repo = DBConfig.dataSource.getRepository<Role>(Role as any);
    const entity = repo.create(role as any);
    return await repo.save(entity as any);
  }

  async findAll(): Promise<Role[]> {
    return await DBConfig.dataSource.getRepository(Role).find();
  }
}
