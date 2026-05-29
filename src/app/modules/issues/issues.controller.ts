import { Request, Response } from "express";

import { validateIssueData } from "./issues.validation";
import { createIssueIntoDB, deleteIssueFromDB, getAllIssuesFromDB, getSingleIssueFromDB, updateIssueIntoDB } from "./issues.service";


export const createIssue = async (
  req: Request,
  res: Response
) => {
  try {
    const error = validateIssueData(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const result = await createIssueIntoDB(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllIssues = async (
  req: Request,
  res: Response
) => {
  const result = await getAllIssuesFromDB(
    req.query
  );

  res.status(200).json({
    success: true,
    message: "Issues retrieved successfully",
    data: result,
  });
};

export const getSingleIssue = async (
  req: Request,
  res: Response
) => {
  const result = await getSingleIssueFromDB(
    req.params.id as string
  );

  res.status(200).json({
    success: true,
    message: "Issue retrieved successfully",
    data: result,
  });
};

export const updateIssue = async (
  req: Request,
  res: Response
) => {
  const result = await updateIssueIntoDB(
    req.params.id as string,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Issue updated successfully",
    data: result,
  });
};

export const deleteIssue = async (
  req: Request,
  res: Response
) => {
  await deleteIssueFromDB(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Issue deleted successfully",
  });
};