"use server";

import User from "@/lib/models/User";
import { connect } from "@/lib/db";

export async function createUser(user) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}