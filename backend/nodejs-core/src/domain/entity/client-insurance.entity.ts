import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Client } from "./client.entity";
import { InsuranceType } from "./insurance-type.entity";

@Entity("client_insurances")
export class ClientInsurance extends BaseEntity {
  @ManyToOne(() => Client, (client) => client.insurances)
  @JoinColumn({ name: "client_id" })
  client!: Client;

  @ManyToOne(() => InsuranceType, (insurance) => insurance.clientInsurances)
  @JoinColumn({ name: "insurance_type_id" })
  insuranceType!: InsuranceType;

  @Column({ default: "ACTIVE" })
  status!: string;

  @Column({
    name: "assigned_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  assignedAt!: Date;

  @Column({ name: "cancelled_at", type: "timestamp", nullable: true })
  cancelledAt?: Date;
}
