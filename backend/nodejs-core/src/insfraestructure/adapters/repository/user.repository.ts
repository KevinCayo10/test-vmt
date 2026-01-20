import { DBConfig } from "../../../shared/config/config-db";
import { User } from "../../../domain/entity";
import { UserRepository } from "../../../domain/repository/user.repository";

export class UserImplement implements UserRepository {
  async create(user: Partial<User>): Promise<User> {
    const repo = DBConfig.dataSource.getRepository<User>(User as any);
    const entity = repo.create(user as any);
    return await repo.save(entity as any);
  }

  async findById(id: number): Promise<User | null> {
    return await DBConfig.dataSource.getRepository(User).findOneBy({ id });
  }

  async findByUsernameOrEmail(userOrEmail: string): Promise<User | null> {
    const repo = DBConfig.dataSource.getRepository(User);
    return (
      (await repo.findOne({
        where: [{ username: userOrEmail }, { email: userOrEmail }],
      })) || null
    );
  }

  async findAll(filters?: any): Promise<User[]> {
    const repo = DBConfig.dataSource.getRepository(User);
    const qb = repo.createQueryBuilder("u");
    if (filters?.name)
      qb.andWhere("u.firstName ILIKE :name OR u.lastName ILIKE :name", {
        name: `%${filters.name}%`,
      });
    if (filters?.status)
      qb.andWhere("u.status = :status", { status: filters.status });
    if (filters?.roleId)
      qb.andWhere("u.role_id = :roleId", { roleId: filters.roleId });
    return await qb.getMany();
  }

  async update(id: number, data: Partial<User>): Promise<any> {
    return await DBConfig.dataSource
      .getRepository(User)
      .update({ id }, data as any);
  }
}
