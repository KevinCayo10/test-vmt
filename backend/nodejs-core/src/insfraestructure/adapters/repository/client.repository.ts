import { DBConfig } from "../../../shared/config/config-db";
import { Client } from "../../../domain/entity";
import { ClientRepository } from "../../../domain/repository/client.repository";

export class ClientImplement implements ClientRepository {
  async create(payload: Partial<Client>): Promise<Client> {
    const repo = DBConfig.dataSource.getRepository<Client>(Client as any);
    const entity = repo.create(payload as any);
    return await repo.save(entity as any);
  }

  async findAll(filters?: any): Promise<Client[]> {
    const repo = DBConfig.dataSource.getRepository(Client);
    const qb = repo.createQueryBuilder("c");
    if (filters?.clientType)
      qb.andWhere("c.clientType = :type", { type: filters.clientType });
    return await qb.getMany();
  }

  async findById(id: number): Promise<Client | null> {
    return await DBConfig.dataSource.getRepository(Client).findOneBy({ id });
  }
}
