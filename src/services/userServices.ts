import { compare, hash } from "bcryptjs";
import { IUserLogin, IUserRequest, IUserUpdate } from "../interfaces/users";
import jwt from "jsonwebtoken";
import { userRepo } from "../repositories/allRespositories";

export const createUserService = async (dataNewUser: IUserRequest) => {
  const userExists = await userRepo.findOneBy({ email: dataNewUser.email });

  if (userExists) {
    return [409, { message: "User already exists" }];
  }

  const user = userRepo.create(dataNewUser);

  await userRepo.save(user);

  const { password: removePass, ...newUser } = user;

  return [201, newUser];
};

export const loginUserService = async (dataUserLogin: IUserLogin) => {
  const { email, password } = dataUserLogin;

  const userExists = await userRepo.findOneBy({ email: email });

  if (!userExists?.isActive) {
    return [400, { message: "Inactive user" }];
  }

  if (!userExists) {
    return [403, { message: "Invalid email or password" }];
  }

  const comparePass = await compare(password, userExists.password);

  if (!comparePass) {
    return [403, { message: "Invalid email or password" }];
  }

  const token = jwt.sign(
    { isAdm: userExists.isAdm },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: userExists.id,
    }
  );

  return [200, { user: userExists, token: token }];
};

export const getAllUsersService = async () => {
  const users = await userRepo.createQueryBuilder("users").getMany();

  const removePass = users.map((user) => {
    const { password: deletePass, ...users } = user;

    return users;
  });

  return [200, removePass];
};

export const updateUserService = async (
  dataUpdateUser: IUserUpdate,
  id: string,
  authToken: string
) => {
  const user = await userRepo.findOneBy({ id: id });

  const token = authToken.split(" ")[1];

  if (!user) {
    return [404, { message: "User not found" }];
  }

  if (user.isAdm) {
    if (
      dataUpdateUser.hasOwnProperty("isAdm") ||
      dataUpdateUser.hasOwnProperty("isActive") ||
      dataUpdateUser.hasOwnProperty("id")
    ) {
      return [401, { message: "these fields cannot be changed" }];
    }

    return jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      async (error, decoded: any) => {
        if (error) {
          return error.message;
        }

        const verifyAdmin = await userRepo.findOneBy({
          id: decoded.sub,
        });

        if (verifyAdmin?.isAdm) {
          user.name = dataUpdateUser.name || user.name;
          user.email = dataUpdateUser.email || user.email;

          if (dataUpdateUser.password) {
            const hashPassword = await hash(dataUpdateUser.password, 10);
            user.password = hashPassword;
          }

          await userRepo.save(user);

          const { password: removePass, ...userEdited } = user;

          return [200, userEdited];
        } else {
          return [403, { message: "Need admin permission" }];
        }
      }
    );
  }

  if (!user.isAdm && user.id !== id) {
    return [401, { message: "missing adimin permission" }];
  }

  if (
    dataUpdateUser.hasOwnProperty("isAdm") ||
    dataUpdateUser.hasOwnProperty("isActive") ||
    dataUpdateUser.hasOwnProperty("id")
  ) {
    return [401, { message: "these fields cannot be changed" }];
  }

  await userRepo.update(id, { ...dataUpdateUser, updatedAt: new Date() });
  const { password: removePass, ...userEdited } = user;

  return [200, userEdited];
};

export const deleteUserService = async (id: string) => {
  const user = await userRepo.findOneBy({ id: id });

  if (!user) {
    return [404, { message: "User not found" }];
  }

  if (!user.isActive) {
    return [400, { message: "User is not active" }];
  }

  const deletedUser = await userRepo.update(id, { isActive: false });

  return [204, {}];
};
