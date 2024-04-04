import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Organization is required!"],
    },
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    location: {
      type: String,
      required: [true, "Location is required!"],
    },
    minSalary: {
      type: Number,
      required: [true, "Salary is required!"],
    },
    maxSalary: {
      type: Number,
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required!"],
    },
  },
  { timestamps: true }
);

const Job = models?.Job || model("Job", JobSchema);

export default Job;
