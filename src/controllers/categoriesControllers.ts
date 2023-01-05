import { Request, Response } from "express";
import {
  createCategoriesService,
  getCategoriesService,
} from "../services/categoriesServices";

export const createCategoriesController = async (
  req: Request,
  res: Response
) => {
  const data = req.body;
  const [status, category]: any = await createCategoriesService(data);

  return res.status(status).json(category);
};

export const getCategoriesController = async (req: Request, res: Response) => {
  const [status, category]: any = await getCategoriesService();

  return res.status(status).json(category);
};
