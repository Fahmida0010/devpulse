import express from "express";
import cors from "cors";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { IssueRoutes } from "./app/modules/issues/issues.route";

const app = express();

app.use(cors());
app.use(express.json());

//auth routes
app.use("/api/auth", AuthRoutes);

//issues routes
app.use("/api/issues", IssueRoutes);



app.get("/", (req, res) => {
  res.send("DevPulse Server Running on 5000 ");
});

export default app;