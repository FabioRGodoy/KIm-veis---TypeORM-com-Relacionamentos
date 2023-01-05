import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  loginUserService,
  updateUserService,
} from "../services/userServices";

export const createUserController = async (req: Request, res: Response) => {
  const data = req.body;

  const [status, newUser]: any = await createUserService(data);

  return res.status(status).json(newUser);
};

export const loginUserController = async (req: Request, res: Response) => {
  const data = req.body;

  const [status, login]: any = await loginUserService(data);

  return res.status(status).json(login);
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const [status, users]: any = await getAllUsersService();

  return res.status(status).json(users);
};

export const updateUserController = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const token = req.headers.authorization!;

  const [status, user]: any = await updateUserService(data, id, token);

  return res.status(status).json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const [status, deletedUser]: any = await deleteUserService(id);

  return res.status(status).json(deletedUser);
};
