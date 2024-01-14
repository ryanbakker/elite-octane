"use client";

import { Kanit } from "next/font/google";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { CarFront, CircleUser } from "lucide-react";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

function HeroSection() {
  const smoothScrollToSection = (e: any) => {
    e.preventDefault();

    const targetElement = document.getElementById("listings");

    if (targetElement) {
      window.scrollTo({
        behavior: "smooth",
        top: targetElement.offsetTop,
      });
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-8">
        <h1
          className={`${kanit.className} text-7xl max-w-[45vw] leading-[5rem] z-30`}
        >
          Precision Meets Passion in Our Enthusiast Car Hub!
        </h1>

        <p className="max-w-[500px] font-light text-slate-400">
          Join today to find the next car to add to your collection, or sell
          your existing one so it can begin it's next journey.
        </p>

        <div className="flex flex-row gap-4">
          <Button size="lg" variant="outline" asChild>
            <Link
              href="/#listings"
              className="flex flex-row gap-2 bg-slate-900 border-sky-950 text-sky-100 hover:text-sky-400 hover:border-sky-600 transition-all"
              onClick={smoothScrollToSection}
            >
              <CarFront /> Explore Listings
            </Link>
          </Button>
          <Button size="lg" asChild>
            <Link
              href="/sign-up"
              className="flex flex-row gap-2 from-sky-700 to-sky-500 bg-gradient-to-tr hover:from-sky-800 hover:to-sky-400 hover:text-sky-950 text-white transition-all"
            >
              <CircleUser /> Sign Up
            </Link>
          </Button>
        </div>
      </div>

      <Image
        src="/assets/images/mustang.png"
        alt="Ford Mustang"
        height={1200}
        width={1200}
        className="absolute -right-[130px] bottom-[10px] -z-10"
      />

      <p className="absolute right-6 top-4 text-right font-light dark:text-slate-400">
        2023 <br /> Ford Mustang GTR
      </p>
    </div>
  );
}

export default HeroSection;
