import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
})

export const userModel = mongoose.model(userCollection, userSchema)