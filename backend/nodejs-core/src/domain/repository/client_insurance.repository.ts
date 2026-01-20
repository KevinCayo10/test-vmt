import { ClientInsurance } from "../../domain/entity";

export interface ClientInsuranceRepository {
  create: (payload: Partial<ClientInsurance>) => Promise<ClientInsurance>;
  findById: (id: number) => Promise<ClientInsurance | null>;
  update: (id: number, data: Partial<ClientInsurance>) => Promise<any>;
}
