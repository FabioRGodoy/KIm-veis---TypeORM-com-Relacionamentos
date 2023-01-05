import { Request, Response } from "express";
import {
  createPropertiesService,
  getPropertiesFromCategoryService,
  getPropertiesService,
} from "../services/propertiesServices";

export const createPropertiesController = async (
  req: Request,
  res: Response
) => {
  const data = req.body;
  const [status, property]: any = await createPropertiesService(data);

  return res.status(status).json(property);
};

export const getPropertiesController = async (req: Request, res: Response) => {
  const [status, properties]: any = await getPropertiesService();

  return res.status(status).json(properties);
};

export const getPropertiesFromCategoryController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  const [status, properties]: any = await getPropertiesFromCategoryService(id);

  return res.status(status).json(properties);
};
