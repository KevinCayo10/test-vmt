import { UserRepository } from "../../domain/repository/user.repository";
import { hashPassword } from "../../shared/util/hash.util";
import { sendAudit } from "../../shared/util/audit.util";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(payload: any) {
    // generate username and email
    const username =
      `${payload.firstName.toLowerCase()}.${payload.lastName.toLowerCase()}`.replace(
        /\s+/g,
        "",
      );
    const email = payload.email ?? `${username}@example.com`;

    // check duplicates will be handled at repo level unique constraints
    const password = payload.password ?? "ChangeMe123!";
    const hashed = await hashPassword(password);

    const user = await this.repository.create({
      ...payload,
      username,
      email,
      password: hashed,
      status: "ACTIVE",
    });

    await sendAudit("user_created", { userId: user.id });
    return user;
  }

  async findAll(filters?: any) {
    return await this.repository.findAll(filters);
  }

  async update(id: number, payload: any) {
    const res = await this.repository.update(id, payload);
    await sendAudit("user_updated", { userId: id, payload });
    return res;
  }
}
