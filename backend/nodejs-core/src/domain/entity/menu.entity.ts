import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "menus",
})
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 1024, nullable: true })
  remoteEntry!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  exposedModule!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  displayName!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  routePath!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  ngModuleName!: string;
}
