import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <main className="flex flex-center h-screen flex-col">
      <Image
        src="/default-monochrome.svg"
        width={60}
        height={10}
        className="mb-3"
      ></Image>
      <div className="border border-secondary-200 bg-gray-900 padding-container py-5 rounded-lg">
        <h1 className="font-semibold mb-5 text-center">Continue with</h1>
        <form action="" className="flex flex-col gap-2">
          <label className="text-sm text-secondary-100">
            Email or username
          </label>
          <input
            type="text"
            placeholder="email or username"
            className="bg-transparent border border-secondary-200 rounded-md px-2 py-1 outline-none focus:border-accent-200 transition-all w-[300px]"
          />
        </form>
      </div>
    </main>
  );
};

export default page;
