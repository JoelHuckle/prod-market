"use server";

import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function createUser(user) {
  try {
    await connectDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
