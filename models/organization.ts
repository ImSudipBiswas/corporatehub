import { Schema, model, models } from "mongoose";

const OrganizationSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
    required: [true, "Username is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    select: false,
  },
  image: {
    type: String,
  },
});

const Organization = models?.Organization || model("Organization", OrganizationSchema);

export default Organization;
