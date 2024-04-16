"use client";
//validation and server form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

// ui imports
import { Button } from "@/components/ui/button";

//server actions
import { createPost } from "@/lib/actions/post.action";
import { createService } from "@/lib/actions/service.action";

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
});

const Create = () => {
  const [loopSelected, setLoopSelected] = useState(true);

  //date for placeholder values
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
          action={createPost}
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
                required
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
                required
              />
            </div>
          </div>
          <div className="border rounded-lg border-secondary-200">
            <input
              type="text"
              name="title"
              className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm font-bold"
              placeholder={`Loops ${date}`}
              required
            />
            <textarea
              name="caption"
              type="text"
              className="bg-transparent w-full outline-none px-3 py-2 text-sm resize-none h-[120px]"
              placeholder="Loops in the style of..."
              required
            />
            <div className="flex flex-center">
              <p className="relative left-2 bottom-[0.7px]">$</p>
              <input
                type="number"
                name="price"
                className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <Button className="mt-5 w-32">Submit</Button>
        </form>

        {/* Service form */}
        <form
          action={createService}
          className={`${
            loopSelected ? "hidden" : "flex"
          } flex-col text-primary text-sm lg:ml-[150px]`}
        >
          <div className="flex mb-4 gap-7">
            {/* link */}
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="waitTime" className="font-bold">
                Max Wait Time (days)
              </label>
              <input
                type="number"
                step="1"
                name="waitTime"
                placeholder="5"
                className="input"
                required
              />
            </div>
            {/* preview */}
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="type" className="font-bold ">
                Type
              </label>
              <select
                name="type"
                id="type"
                className="input"
                required
                defaultValue="Service"
              >
                <option value="collab">Collab</option>
                <option value="loop-sub">Loop Subscription</option>
              </select>
            </div>
          </div>
          <div className="border rounded-lg border-secondary-200">
            <input
              type="text"
              name="title"
              className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm font-bold"
              placeholder={`Loops ${date}`}
              required
            />
            <textarea
              name="caption"
              type="text"
              className="bg-transparent w-full outline-none px-3 py-2 text-sm resize-none h-[120px]"
              placeholder="Loops in the style of..."
              required
            />
            <div className="flex flex-center">
              <p className="relative left-2 bottom-[0.7px]">$</p>
              <input
                type="number"
                name="price"
                className="bg-transparent w-full border-b border-secondary-200 outline-none px-3 py-2 text-sm"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <Button className="mt-5 w-32">Submit</Button>
        </form>
      </section>
    </main>
  );
};

export default Create;
