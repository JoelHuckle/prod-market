"use server";
import { redirect } from "next/navigation";

import Post from "@/lib/models/Post";
import { connect } from "@/lib/db";

export async function createPost(formData) {
  const post = {
    userId: 0,
    title: formData.get("title"),
    caption: formData.get("caption"),
    price: formData.get("price"),
    url: formData.get("url"),
    preview: JSON.stringify(formData.get("preview")),
  };

  await connect();
  const newPost = await Post.create(post);
  console.log("post created: ", JSON.parse(JSON.stringify(newPost)));
  redirect(`http://localhost:3000/profile/${post.userId}`);
}

export async function getPost() {}
