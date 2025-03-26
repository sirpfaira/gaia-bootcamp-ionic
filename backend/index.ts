import express, { Request, Response } from "express";
import mongoose from "mongoose";
import axios from "axios";
import rateLimit from "express-rate-limit";
import { IUser } from "./models";
import { fetchUsers, loginUser, registerUser } from "./controllers";
import { CustomRequest, authenticate, authorize } from "./middleware";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:8100"] }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 2, // limit each IP to 2 requests per windowMs
});

app.use(limiter);

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ionic";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/comments", async (req: Request, res: Response) => {
  await axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
});

app.post("/register", async (req: Request, res: Response) => {
  const userData: Partial<IUser> = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const registeredUser = await registerUser(userData);
  if (registeredUser.error) {
    res.status(400).json({
      error: registeredUser.error,
    });
  }
  res.status(201).json(registeredUser);
});

app.post("/login", async (req: Request, res: Response) => {
  const userData: Partial<IUser> = {
    email: req.body.email,
    password: req.body.password,
  };
  const loggedInUser = await loginUser(userData);
  if (loggedInUser?.error) {
    res.status(400).json({
      error: loggedInUser.error,
    });
  }
  res.status(200).json(loggedInUser);
});

app.get("/user", authenticate, async (req: CustomRequest, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
});

app.post("/logout", authenticate, async (req: CustomRequest, res: Response) => {
  if (req.user) {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  }

  res.status(200).json({
    message: "User logged out successfully.",
  });
});

app.post("/logoutall", authenticate, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = [];
    await req.user.save();
  }
  res.status(200).json({
    message: "User logged out from all devices successfully.",
  });
});

// Fetch all users. This route is only accessible by the admin.
app.get(
  "/admin",
  authenticate,
  authorize,
  async (req: Request, res: Response) => {
    const allUsers = await fetchUsers();
    res.status(200).json(allUsers);
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error: any) => {
      console.error("Error: ", error);
    });
});
