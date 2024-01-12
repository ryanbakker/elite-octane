"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavList() {
  const pathname = usePathname();

  return (
    <ul>
      {navLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li key={link.route}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavList;
