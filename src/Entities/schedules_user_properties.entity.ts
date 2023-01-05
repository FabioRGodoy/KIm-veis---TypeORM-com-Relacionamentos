import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { PropertiesEntity } from "./properties.entity";
import { UserEntity } from "./user.entity";

@Entity("schedules_user_properties")
export class SchedulesUserPropertiesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(
    () => PropertiesEntity,
    (schedules_user_properties) => schedules_user_properties.schedules
  )
  property: PropertiesEntity;

  @ManyToOne(() => UserEntity, (user) => user.schedules)
  user: UserEntity;
}
