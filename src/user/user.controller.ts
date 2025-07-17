import { Request, Response } from "express";
import UserModel from "./user.model.js";

//Create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { companyId, username, email, password } = req.body;

    const existingUser = await UserModel.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const newUser = await UserModel.create({
      companyId,
      username,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
