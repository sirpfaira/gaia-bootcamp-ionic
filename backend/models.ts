import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export { Student };
