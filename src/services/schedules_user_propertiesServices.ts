import { IScheduleRequest } from "../interfaces/schedules";
import {
  propertyRepo,
  schedulesRepo,
  userRepo,
} from "../repositories/allRespositories";

export const createSchedulesService = async (
  dataSchedules: IScheduleRequest,
  userId: string
) => {
  const { date, hour, propertyId } = dataSchedules;

  const property = await propertyRepo.findOneBy({ id: propertyId });

  const user = await userRepo.findOneBy({ id: userId });

  if (property?.id !== propertyId) {
    return [404, { message: "Property not found" }];
  }

  const schedulesExist = await schedulesRepo
    .createQueryBuilder("schedules_users_properties")
    .where(
      "schedules_users_properties.hour = :hour AND schedules_users_properties.date = :date",
      {
        date: date,
        hour: hour,
      }
    )
    .getExists();

  if (schedulesExist) {
    return [
      409,
      { message: "There is already an appointment for that date or time" },
    ];
  }

  const newSchedule = schedulesRepo.create({
    date,
    hour,
    property: property,
    user: user!,
  });

  await schedulesRepo.save(newSchedule);

  return [201, { message: "Schedule created" }];
};

export const getSheduleService = async (sheduleId: string) => {
  const propertyId = await propertyRepo.findOneBy({ id: sheduleId });

  if (!propertyId) {
    return [404, { message: "Schedule created" }];
  }

  const schedule = await propertyRepo.find({
    where: {
      id: sheduleId,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  return [200, schedule[0]];
};
