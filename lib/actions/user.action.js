"use server";

import User from "@/lib/models/User";
import { connect } from "@/lib/db";

export async function createUser(user) {
  try {
    console.log("creating user...");
    await connect();
    console.log("connected");
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
