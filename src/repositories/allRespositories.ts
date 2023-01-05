import AppDataSource from "../data-source";
import { AdressEntity } from "../Entities/addresses.entity";
import { CategoriesEntity } from "../Entities/categories.entity";
import { PropertiesEntity } from "../Entities/properties.entity";
import { SchedulesUserPropertiesEntity } from "../Entities/schedules_user_properties.entity";
import { UserEntity } from "../Entities/user.entity";

export const propertyRepo = AppDataSource.getRepository(PropertiesEntity);

export const categoriesRepo = AppDataSource.getRepository(CategoriesEntity);

export const addressRepo = AppDataSource.getRepository(AdressEntity);

export const userRepo = AppDataSource.getRepository(UserEntity);

export const schedulesRepo = AppDataSource.getRepository(
  SchedulesUserPropertiesEntity
);
