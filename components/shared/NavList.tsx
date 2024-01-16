"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavList() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-row gap-2 items-center">
      {navLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li key={link.route}>
            <Link
              href={link.route}
              className={`${
                isActive && "dark:bg-sky-950 text-sky-300 border border-sky-400"
              } rounded-sm px-6 py-2 font-medium`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavList;
