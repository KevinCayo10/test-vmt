import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Role } from "./role.entity";

@Entity("users")
export class User extends BaseEntity {
  @Column({ name: "first_name" })
  firstName!: string;

  @Column({ name: "last_name" })
  lastName!: string;

  @Column({ unique: true })
  identification!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: "ACTIVE" })
  status!: string;

  @Column({ name: "failed_attempts", default: 0 })
  failedAttempts!: number;

  @Column({ name: "last_login_at", nullable: true })
  lastLoginAt?: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
