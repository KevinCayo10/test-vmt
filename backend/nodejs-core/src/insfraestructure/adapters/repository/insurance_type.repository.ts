import { DBConfig } from "../../../shared/config/config-db";
import { InsuranceType } from "../../../domain/entity";
import { InsuranceTypeRepository } from "../../../domain/repository/insurance_type.repository";

export class InsuranceTypeImplement implements InsuranceTypeRepository {
  async create(payload: Partial<InsuranceType>): Promise<InsuranceType> {
    const repo = DBConfig.dataSource.getRepository<InsuranceType>(
      InsuranceType as any,
    );
    const entity = repo.create(payload as any);
    return await repo.save(entity as any);
  }

  async findAll(): Promise<InsuranceType[]> {
    return await DBConfig.dataSource.getRepository(InsuranceType).find();
  }
}
