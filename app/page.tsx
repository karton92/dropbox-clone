import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="">
      <Header />
      <h1>Dropbox Clone</h1>
    </main>
  );
}
