import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "../theme/ThemeToggler";
import NavList from "./NavList";
import { Button } from "../ui/button";
import Link from "next/link";

function NavDesktop() {
  return (
    <nav className="flex items-center gap-6 flex-row">
      <SignedIn>
        <NavList />
        <ThemeToggler />
        <div className="border border-red-500 rounded-full p-1 flex items-center justify-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
      <SignedOut>
        <ThemeToggler />
        <Button asChild size="lg">
          <Link href="/sign-in">Login</Link>
        </Button>
      </SignedOut>
    </nav>
  );
}

export default NavDesktop;
