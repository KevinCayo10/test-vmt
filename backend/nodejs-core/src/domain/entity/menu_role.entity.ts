import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Role } from "./role.entity";

@Entity("menus_by_role")
export class MenuRole extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  path!: string;

  @ManyToOne(() => Role, (role) => role.menus)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
