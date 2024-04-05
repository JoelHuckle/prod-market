import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const page = async () => {
  return (
    <main className="bg-dark-100 padding-container h-screen flex flex-col flex-center gap-5">
      <Image src="/default-monochrome.svg" width={70} height={70} />
      <SignIn />
    </main>
  );
};

export default page;
