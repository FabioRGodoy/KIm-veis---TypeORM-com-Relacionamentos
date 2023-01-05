import { Request, Response } from "express";
import {
  createSchedulesService,
  getSheduleService,
} from "../services/schedules_user_propertiesServices";

export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const id = req.user.id;
  const body = req.body;
  const [status, schedule]: any = await createSchedulesService(body, id);

  return res.status(status).json(schedule);
};

export const getScheduleController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const [status, schedules]: any = await getSheduleService(id);

  return res.status(status).json(schedules);
};
