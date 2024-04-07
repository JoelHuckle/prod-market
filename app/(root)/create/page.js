"use client";
//validation and server form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ui imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
});

const Create = () => {
  const [loopSelected, setLoopSelected] = useState(true);

  // const onSubmit = async () => {
  //   try {
  //     const formData = form.getValues();
  //     const res = await fetch("http://localhost:4000/post/createPost", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }
  //     const resData = await res.json();
  //     router.push("/profile/darko");

  //     // Handle successful response here
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //     // Handle error here
  //   }
  // };

  const nowDate = new Date();
  const date =
    nowDate.getDate() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getFullYear();

  return (
    <main className="padding-container">
      <h1 className="text-2xl font-semibold py-7 lg:ml-32">Create</h1>
      <div className="flex justify-around flex-1 text-center lg:flex-col lg:fixed top-[22.7%] left-9 gap-5 mb-7">
        <h2
          onClick={() => setLoopSelected(true)}
          className={`${
            loopSelected ? "bg-secondary-200" : ""
          } py-2 cursor-pointer rounded-lg transition-all sm:w-[50%] lg:w-36`}
        >
          Loops
        </h2>
        <h2
          onClick={() => setLoopSelected(false)}
          className={`${
            loopSelected ? "" : "bg-secondary-200"
          } py-2 cursor-pointer rounded-lg transition-all sm:w-[50%] lg:w-36`}
        >
          Service
        </h2>
      </div>

      <section>
        {/* Loop form */}
        <form
          action=""
          className={`${
            loopSelected ? "flex" : "hidden"
          } flex-col text-primary text-sm lg:ml-[150px]`}
        >
          <div className="flex mb-4 gap-7">
            {/* link */}
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="url" className="font-bold">
                Link
              </label>
              <input
                type="text"
                name="url"
                placeholder="dropbox.com/..."
                className=" input"
              />
            </div>
            {/* preview */}
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="preview" className="font-bold ">
                Preview
              </label>
              <input
                type="file"
                name="preview"
                placeholder="dropbox.com/..."
                className="py-11 input"
              />
            </div>
          </div>
          <div className="border rounded-lg border-secondary-200">
            <input
              type="text"
              name="title"
              className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm font-bold"
              placeholder={`Loops ${date}`}
            />
            <textarea
              name="caption"
              type="text"
              className="bg-transparent w-full outline-none px-3 py-2 text-sm resize-none h-[120px]"
              placeholder="Loops in the style of..."
            />
            <input
              type="number"
              name="price"
              className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm"
              placeholder="$ 0.00"
            />
          </div>
          <Button className="mt-5 w-32">Submit</Button>
        </form>

        {/* Service form */}
        <form
          action=""
          className={`${
            loopSelected ? "hidden" : "flex"
          } flex-col text-primary lg:ml-[150px]`}
        >
          <div className="flex mb-4 gap-7">
            {/* link */}
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="" className="font-bold">
                Link
              </label>
              <input
                type="text"
                name="url"
                placeholder="dropbox.com/..."
                className=" input"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="waitTime" className="font-bold ">
                Max wait time (days)
              </label>
              <input
                type="number"
                name="waitTime"
                placeholder="3"
                className="py-11 input"
              />
            </div>
          </div>
          <div className="border rounded-lg border-secondary-200">
            <input
              type="text"
              name="title"
              className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm font-bold"
              placeholder={`Loops ${date}`}
            />
            <textarea
              name="caption"
              type="text"
              className="bg-transparent w-full outline-none px-3 py-2 text-sm resize-none h-[120px]"
              placeholder="Loops in the style of..."
            />
            <input
              type="number"
              name="price"
              className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm"
              placeholder="$ 0.00"
            />
          </div>
          <Button className="mt-5 w-32">Submit</Button>
        </form>
      </section>
    </main>
  );
};

export default Create;
