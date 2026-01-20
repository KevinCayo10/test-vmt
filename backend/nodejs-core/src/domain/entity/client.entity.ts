import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ClientInsurance } from "./client-insurance.entity";

@Entity("clients")
export class Client extends BaseEntity {
  @Column({ name: "client_type" })
  clientType!: string;

  @Column({ unique: true })
  identification!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @OneToMany(() => ClientInsurance, (ci) => ci.client)
  insurances!: ClientInsurance[];
}
