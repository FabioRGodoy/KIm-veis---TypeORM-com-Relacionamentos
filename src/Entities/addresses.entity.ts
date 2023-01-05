import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("addresses")
export class AdressEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ nullable: false })
  number: number;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;
}
