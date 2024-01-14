import Link from "next/link";
import { Kanit } from "next/font/google";
import { KeySquare } from "lucide-react";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

function Logo() {
  return (
    <Link href="/">
      <h2
        className={`flex flex-row items-center gap-2 text-3xl ${kanit.className}`}
      >
        <KeySquare size={22} /> EliteOctane
      </h2>
    </Link>
  );
}

export default Logo;
