import express, { Request, Response } from "express";
import axios from "axios";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/users", async (req: Request, res: Response) => {
  await axios
    .get("https://randomuser.me/api/?inc=name,nat,picture,email&results=20")
    .then((response) => res.send(response.data.results))
    .catch((error) => res.send(error));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
