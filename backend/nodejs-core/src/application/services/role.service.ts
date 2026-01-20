import { RoleRepository } from "../../domain/repository/role.repository";
import { sendAudit } from "../../shared/util/audit.util";

export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async create(payload: any) {
    const role = await this.repository.create(payload);
    await sendAudit("role_created", { roleId: (role as any).id });
    return role;
  }

  async findAll() {
    return await this.repository.findAll();
  }
}
