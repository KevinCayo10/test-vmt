import { ClientInsuranceRepository } from "../../domain/repository/client_insurance.repository";
import { DBConfig } from "../../shared/config/config-db";
import { sendAudit } from "../../shared/util/audit.util";
import { notifyClient } from "../../shared/util/notification.util";

export class ClientInsuranceService {
  constructor(private readonly repository: ClientInsuranceRepository) {}

  async assign(clientId: number, insuranceTypeId: number) {
    // basic business rule examples: prevent duplicate active insurance of same type for same client
    const repo = DBConfig.dataSource.getRepository("client_insurances");
    const existing = await (repo as any).findOne({
      where: {
        client: { id: clientId },
        insuranceType: { id: insuranceTypeId },
        status: "ACTIVE",
      },
    });
    if (existing) throw new Error("Insurance already assigned");

    // use repository to create
    const record = await this.repository.create({
      client: { id: clientId } as any,
      insuranceType: { id: insuranceTypeId } as any,
    });
    // audit & notify
    sendAudit("insurance_assigned", {
      clientId,
      insuranceId: (record as any).id,
    });
    notifyClient(
      "email",
      (record as any).client?.email ?? "",
      "Insurance assigned",
      "A new insurance was assigned",
    );
    return record;
  }

  async cancel(clientId: number, insuranceId: number) {
    const rec = await this.repository.findById(insuranceId);
    if (!rec) throw new Error("Insurance not found");
    if ((rec as any).client?.id !== clientId)
      throw new Error("Insurance does not belong to client");
    await this.repository.update(insuranceId, {
      status: "CANCELLED",
      cancelledAt: new Date(),
    } as any);
    sendAudit("insurance_cancelled", { clientId, insuranceId });
    notifyClient(
      "email",
      (rec as any).client?.email ?? "",
      "Insurance cancelled",
      "Your insurance was cancelled",
    );
    return { ok: true };
  }

  async reactivate(clientId: number, insuranceId: number) {
    const rec = await this.repository.findById(insuranceId);
    if (!rec) throw new Error("Insurance not found");
    if ((rec as any).client?.id !== clientId)
      throw new Error("Insurance does not belong to client");
    await this.repository.update(insuranceId, {
      status: "ACTIVE",
      cancelledAt: null,
    } as any);
    sendAudit("insurance_reactivated", { clientId, insuranceId });
    notifyClient(
      "email",
      (rec as any).client?.email ?? "",
      "Insurance reactivated",
      "Your insurance was reactivated",
    );
    return { ok: true };
  }

  async findByClient(clientId: number) {
    if (typeof this.repository.findAllByClient !== "function") return [];
    return await (this.repository.findAllByClient as any)(clientId);
  }
}
