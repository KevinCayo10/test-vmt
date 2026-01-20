import { UserRepository } from "../../domain/repository/user.repository";
import { comparePassword } from "../../shared/util/hash.util";
import { signToken } from "../../shared/util/jwt.util";
import { sendAudit } from "../../shared/util/audit.util";

export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  async login(identifier: string, password: string) {
    const user = await this.repository.findByUsernameOrEmail(identifier);
    if (!user) {
      await sendAudit("login_failed", { identifier, reason: "not_found" });
      throw new Error("Usuario no existe");
    }

    if (user.status === "BLOCKED") {
      await sendAudit("login_failed", { userId: user.id, reason: "blocked" });
      throw new Error("Usuario bloqueado");
    }

    const match = await comparePassword(password, user.password as any);
    if (!match) {
      // increment failed attempts
      const attempts = (user.failedAttempts || 0) + 1;
      const update: any = { failedAttempts: attempts };
      if (attempts >= 3) update.status = "BLOCKED";
      await this.repository.update(user.id, update);
      await sendAudit("login_failed", {
        userId: user.id,
        reason: "bad_password",
        attempts,
      });
      throw new Error("Contraseña incorrecta");
    }

    // reset failed attempts and update last login
    await this.repository.update(user.id, {
      failedAttempts: 0,
      lastLoginAt: new Date(),
    } as any);
    await sendAudit("login_success", { userId: user.id });

    const token = signToken({
      id: user.id,
      roleId: (user.role as any)?.id || null,
      username: user.username,
    });
    return { token };
  }
}
