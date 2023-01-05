import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { PropertiesEntity } from "./properties.entity";

@Entity("categories")
export class CategoriesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PropertiesEntity, (properties) => properties.category)
  @JoinColumn()
  properties: PropertiesEntity[];
}
