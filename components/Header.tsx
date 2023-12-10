import React from "react";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link className="flex items-center space-x-2" href="/">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src="https://www.shareicon.net/data/256x256/2016/06/20/606338_dropbox_256x256.png"
            alt="Dropbox Clone logo"
            height={50}
            width={50}
            className="invert"
          />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal">
            Sign In
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
