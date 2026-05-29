import { Request, Response } from "express";
import {
  createUserIntoDB,
  loginUserFromDB,
} from "./auth.service";

import {
  validateSignupData,
  validateLoginData,
} from "./auth.validation";

export const signupUser = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateSignupData(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const result = await createUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateLoginData(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const result = await loginUserFromDB(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};