import { Role } from "../../domain/entity";

export interface RoleRepository {
  create: (role: Partial<Role>) => Promise<Role>;
  findAll: () => Promise<Role[]>;
}
