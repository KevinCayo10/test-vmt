import { DBConfig } from "../../../shared/config/config-db";
import { ClientInsurance } from "../../../domain/entity";
import { ClientInsuranceRepository } from "../../../domain/repository/client_insurance.repository";

export class ClientInsuranceImplement implements ClientInsuranceRepository {
  async create(payload: Partial<ClientInsurance>): Promise<ClientInsurance> {
    const repo = DBConfig.dataSource.getRepository<ClientInsurance>(
      ClientInsurance as any,
    );
    const entity = repo.create(payload as any);
    return await repo.save(entity as any);
  }

  async findById(id: number): Promise<ClientInsurance | null> {
    return await DBConfig.dataSource
      .getRepository(ClientInsurance)
      .findOneBy({ id });
  }

  async update(id: number, data: Partial<ClientInsurance>): Promise<any> {
    return await DBConfig.dataSource
      .getRepository(ClientInsurance)
      .update({ id }, data as any);
  }
}
