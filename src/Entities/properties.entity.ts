import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { AdressEntity } from "./addresses.entity";
import { CategoriesEntity } from "./categories.entity";
import { SchedulesUserPropertiesEntity } from "./schedules_user_properties.entity";

@Entity("properties")
export class PropertiesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({})
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => AdressEntity)
  @JoinColumn()
  address: AdressEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.properties)
  category: CategoriesEntity;

  @OneToMany(
    () => SchedulesUserPropertiesEntity,
    (property) => property.property
  )
  schedules: SchedulesUserPropertiesEntity[];
}
