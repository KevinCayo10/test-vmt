import { MenuRoleRepository } from "../../domain/repository/menu_role.repository";
import { sendAudit } from "../../shared/util/audit.util";

export class MenuRoleService {
  constructor(private readonly repository: MenuRoleRepository) {}

  async create(payload: any) {
    const menu = await this.repository.create(payload);
    await sendAudit("menu_created", { menuId: (menu as any).id });
    return menu;
  }

  async findByRole(roleId: number) {
    return await this.repository.findAllByRole(roleId);
  }

  async findAll() {
    return await this.repository.findAll();
  }
}
