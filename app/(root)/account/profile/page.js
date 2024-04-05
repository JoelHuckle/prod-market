"use client";
//validation and server form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// ui imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { DataTransferWarning } from "iconoir-react";

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
});

const editProfile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/getUser");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    setUser(getUserDetails());
  }, []);

  // Define form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      pfp: "",
      banner: "",
      caption: "",
      instagram: "",
    },
  });

  const onSubmit = async () => {
    try {
      const formData = form.getValues();
      const res = await fetch("http://localhost:4000/account/editProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const resData = await res.json();
      router.push("/profile/darko");

      // Handle successful response here
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle error here
    }
  };

  const date = new Date().toISOString().split("T")[0];

  return (
    <main className="padding-container">
      <h1 className="text-2xl font-semibold py-7 lg:ml-32">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="lg:ml-32">
          {/* Loop specific (link + preview)*/}
          <div className="mb-7">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="dropbox, google drive, etc..."
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* title + caption */}
          <div className="border rounded-lg">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={`Loops ${date}`}
                      {...field}
                      className="border-0 border-b border-secondary-200 rounded-none focus-visible:ring-0"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Loops in the style of..."
                      {...field}
                      className="border-0 focus-visible:ring-0"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-row relative w-1/2">
                      <span className="absolute bottom-[8.5px] bg-grey-lighter rounded rounded-r-none px-3 text-grey-darker">
                        $
                      </span>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0.00"
                        className="pl-7 border-0 focus-visible:ring-0"
                        step="0.01"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="mt-7">Post</Button>
        </form>
      </Form>
    </main>
  );
};

export default editProfile;
