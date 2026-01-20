import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ClientInsurance } from "./client-insurance.entity";

@Entity("insurance_types")
export class InsuranceType extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column({ name: "min_amount", type: "decimal", nullable: true })
  minAmount?: number;

  @Column({ name: "max_amount", type: "decimal", nullable: true })
  maxAmount?: number;

  @OneToMany(() => ClientInsurance, (ci) => ci.insuranceType)
  clientInsurances!: ClientInsurance[];
}
