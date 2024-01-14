import Link from "next/link";
import { Kanit } from "next/font/google";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

function Footer() {
  return (
    <footer className="border-t border-slate-900">
      <div className="max-w-7xl lg:mx-auto px-5 py-4 md:px-10 xl:px-0 w-full flex flex-row justify-between items-center">
        <div className="flex flex-col justify-start">
          <Link href="/">
            <h2
              className={`flex flex-row items-center gap-2 text-2xl ${kanit.className}`}
            >
              EliteOctane
            </h2>
          </Link>
          <p className="text-slate-600 text-xs font-light">
            2024 All Rights Reserved
          </p>
        </div>

        <Link
          href="https://github.com/ryanbakker/elite-octane"
          target="_blank"
          className="hover:text-sky-400 transition-all"
        >
          GitHub Repo
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
