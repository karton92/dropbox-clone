import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-gray-600 dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-gray-600 dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold mb-5">Welcome to Dropbox</h1>
          <h2 className="text-3xl font-bold">Storing everything for you and your business needs. All in one place</h2>
          <p className="pb-20">
            Enhance your personal storage with Dropbox, offering a simple and efficent way to upload, organize and access files from anywhere.
            Securely store important documents and media, and experience the convenience of easy file management and sharing in one centralized
            solution.
          </p>

          <Link href="/dashboard" className="flex bg-blue-500 p-3 w-fit">
            Try it for free
            <ArrowRight className="ml-6" />
          </Link>
        </div>

        <div>
          <video
            autoPlay
            loop
            muted
            className="rounded-lg"
            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
          ></video>
        </div>
      </div>

      <p className="text-center font-bold text-xl pt-5">DISCLAIMER</p>
      <p className="text-center font-light p-2">
        This Video is made for informational and educational purposes only. We do not own or affiliate with Dropbox and/or any of its subsidiaries in
        any form. Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made for “fair use” of this video for education
        purposes.
      </p>
    </main>
  );
}
