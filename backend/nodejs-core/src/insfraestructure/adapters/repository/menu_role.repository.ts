import { DBConfig } from "../../../shared/config/config-db";
import { MenuRole } from "../../../domain/entity";
import { MenuRoleRepository } from "../../../domain/repository/menu_role.repository";

export class MenuRoleImplement implements MenuRoleRepository {
  async create(menu: Partial<MenuRole>): Promise<MenuRole> {
    const repo = DBConfig.dataSource.getRepository<MenuRole>(MenuRole as any);
    const entity = repo.create(menu as any);
    return await repo.save(entity as any);
  }

  async findAllByRole(roleId: number): Promise<MenuRole[]> {
    return await DBConfig.dataSource
      .getRepository(MenuRole)
      .find({ where: { role: { id: roleId } } as any });
  }
}
