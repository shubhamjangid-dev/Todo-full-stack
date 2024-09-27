import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// user
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

// group
import groupRouter from "./routes/group.routes.js";
app.use("/api/v1/groups", groupRouter);

// project
import projectRouter from "./routes/project.routes.js";
app.use("/api/v1/projects", projectRouter);

// todo
import todoRouter from "./routes/todo.routes.js";
app.use("/api/v1/todos", todoRouter);
// more

// health check
app.get("/", (req, res) => {
  res.send("<h1>health check</h1>");
});
export { app };
