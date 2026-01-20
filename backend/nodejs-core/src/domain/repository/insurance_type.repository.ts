import { InsuranceType } from "../../domain/entity";

export interface InsuranceTypeRepository {
  create: (payload: Partial<InsuranceType>) => Promise<InsuranceType>;
  findAll: () => Promise<InsuranceType[]>;
}
