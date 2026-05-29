import express from "express";

import {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
} from "./issues.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("contributor", "maintainer"),
  createIssue
);

router.get("/", getAllIssues);

router.get("/:id", getSingleIssue);

router.patch(
  "/:id",
  auth("contributor", "maintainer"),
  updateIssue
);

router.delete(
  "/:id",
  auth("maintainer"),
  deleteIssue
);

export const IssueRoutes = router;