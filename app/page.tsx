import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
      <h1>Dropbox Clone</h1>
    </main>
  );
}
