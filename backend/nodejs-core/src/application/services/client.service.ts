import { ClientRepository } from "../../domain/repository/client.repository";
import { notifyClient } from "../../shared/util/notification.util";
import { sendAudit } from "../../shared/util/audit.util";

export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async create(payload: any) {
    // validation of unique identification/email assumed to be handled by DB unique constraints
    const client = await this.repository.create(payload);
    // notify asynchronously
    notifyClient("email", client.email, "Welcome", "You have been registered");
    await sendAudit("client_created", { clientId: (client as any).id });
    return client;
  }

  async findAll(filters?: any) {
    return await this.repository.findAll(filters);
  }
}
