import { Schema, model, models } from "mongoose";

const OrganizationSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
      lowercase: [true, "Email must be lowercase!"],
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      select: false,
    },
    image: {
      type: String,
      required: [true, "Image is required!"],
    },
  },
  { timestamps: true }
);

const Organization = models?.Organization || model("Organization", OrganizationSchema);

export default Organization;
