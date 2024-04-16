"use server";
import { redirect } from "next/navigation";

import Service from "@/lib/models/Service";
import { connect } from "@/lib/db";

export async function createService(formData) {
  const service = {
    userId: 0,
    title: formData.get("title"),
    caption: formData.get("caption"),
    price: formData.get("price"),
    type: formData.get("type"),
    waitTime: formData.get("waitTime"),
    contract: "placeholder",
  };

  await connect();
  const newService = await Service.create(service);
  console.log("service created: ", JSON.parse(JSON.stringify(newService)));
  redirect(`http://localhost:3000/profile/${service.userId}`);
}
