import { InsuranceTypeRepository } from "../../domain/repository/insurance_type.repository";
import { sendAudit } from "../../shared/util/audit.util";

export class InsuranceTypeService {
  constructor(private readonly repository: InsuranceTypeRepository) {}

  async create(payload: any) {
    const it = await this.repository.create(payload);
    await sendAudit("insurance_type_created", { id: (it as any).id });
    return it;
  }

  async findAll() {
    return await this.repository.findAll();
  }
}
