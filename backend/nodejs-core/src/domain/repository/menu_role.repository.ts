import { MenuRole } from "../../domain/entity";

export interface MenuRoleRepository {
  create: (menu: Partial<MenuRole>) => Promise<MenuRole>;
  findAllByRole: (roleId: number) => Promise<MenuRole[]>;
  findAll: () => Promise<MenuRole[]>;
}
