"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  const google = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <main className="flex flex-center h-screen flex-col">
      <Image
        src="/default-monochrome.svg"
        width={60}
        height={10}
        className="mb-3"
      ></Image>
      <div className="border border-secondary-200 bg-gray-900 px-5 py-5 rounded-lg">
        <h1 className="font-semibold mb-5 text-center">Continue with</h1>
        {/* local */}
        <form
          action=""
          className="flex flex-col gap-2 border-b border-secondary-200 pb-4"
        >
          <label className="text-sm text-secondary-100">
            Email or username
          </label>
          <input
            type="text"
            placeholder="email or username"
            className="bg-transparent border border-secondary-200 rounded-md px-2 py-1 outline-none focus:border-accent-200 transition-all w-[300px]"
          />
        </form>
        <div className="flex mt-4 flex-center flex-col gap-4">
          {/* apple */}
          <Link href="#">
            <Button className="w-[300px] flex gap-3">
              <Image src="/apple_logo.svg" width={18} height={60}></Image>
              <span>Continue with Apple</span>
            </Button>
          </Link>
          {/* google */}
          <div onClick={google}>
            <Button className="w-[300px] flex gap-3">
              <Image
                src="/google_logo.svg"
                width={20}
                height={60}
                className="relative left-[px]"
              ></Image>
              <span>Continue with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
