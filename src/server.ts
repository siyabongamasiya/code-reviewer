import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/authenticationRoutes";
import { testConnection } from "./config/database";
import { notFoundError } from "./middleware/errorHandler";
import submissionRoutes from "./routes/submissionsRoutes";
import userRoutes from "./routes/usersRoutes";
import projectsRoutes from "./routes/projectsRoutes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4040;

app.use(express.json());

//serve static assets from public
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/submissions", submissionRoutes);
app.use(notFoundError);

const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
};

startServer();

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJFbWFpbCI6InNpeWFib25nYUBnbWFpbC5jb20iLCJpYXQiOjE3NjI1MDA5ODUsImV4cCI6MTc2MjUwNDU4NX0.J-UwHu0lWPuMV0ZBf_ATYIhoO3LxlLhzni5_GNx8t3s"

//add project
// {
//     "name" : "job tracker",
//     "description" : "A project for tracking job applications",
//     "created_by" : 1
// }

//login
// {
//   "email" : "siyabonga@gmail.com",
//   "password" : "msiro"
// }

//create user
// {
//   "name" : "siyabonga",
//   "email" : "siyabonga@gmail.com",
//   "password" : "msiro",
//   "profile_picture" : "https://www.someurl.com"
// }

//add member
// {
//   "user_Id" :1,
//   "role_in_project" : "submitter"
// }

//add submission
// {
// "project_id":1,
// "submitted_by":1,
// "code_content" :"dajndjndlandaasidnaodajdoadaosd",
// "status": "pending"
// }