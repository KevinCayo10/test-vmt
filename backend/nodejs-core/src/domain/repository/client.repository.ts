import { Client } from "../../domain/entity";

export interface ClientRepository {
  create: (payload: Partial<Client>) => Promise<Client>;
  findAll: (filters?: any) => Promise<Client[]>;
  findById: (id: number) => Promise<Client | null>;
}
