import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Student } from "./models";

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get("/welcome", (req: Request, res: Response) => {
  res.json("Welcome to Day 5!");
});

app.get("/students", async (req: Request, res: Response) => {
  const students = await Student.find();
  res.json(students);
});

app.get("/students/:id", async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    res.json(student);
  } catch (error: any) {
    console.error(error);
    res.json(error);
  }
});

app.post("/students", async (req: Request, res: Response) => {
  try {
    const newStudent = req.body;
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (error: any) {
    console.error(error);
    res.json(error);
  }
});

app.put("/students/:id", async (req: Request, res: Response) => {
  try {
    const newInfo = req.body;
    const studentId = req.params.id;
    const student = await Student.findByIdAndUpdate(studentId, newInfo, {
      new: true,
    });
    res.json(student);
  } catch (error: any) {
    console.error(error);
    res.json(error);
  }
});

app.delete("/students/:id", async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    res.json("Student deleted successfully!");
  } catch (error: any) {
    console.error(error);
    res.json(error);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
  mongoose
    .connect("mongodb://localhost:27017/ionic")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error: any) => {
      console.error("Error: ", error);
    });
});
