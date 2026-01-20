import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { MenuRole } from "./menu_role.entity";

@Entity("roles")
export class Role extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @OneToMany(() => MenuRole, (menu) => menu.role)
  menus!: MenuRole[];
}
