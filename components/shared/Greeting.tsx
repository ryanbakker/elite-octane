"use client";

import { getUserById } from "@/lib/database/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { Kanit } from "next/font/google";
import { useEffect, useState } from "react";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

type GreetingProps = {
  userFirstName?: string;
  userLastName?: string;
};

function Greeting({ userFirstName, userLastName }: GreetingProps) {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const getCurrentTime = () => {
      const currentTime = new Date().getHours();

      if (currentTime >= 5 && currentTime < 12) {
        setGreeting("Good morning");
      } else if (currentTime >= 12 && currentTime < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    getCurrentTime();
  }, []);

  return (
    <div className="wrapper mt-10 mb-5">
      {userFirstName && userLastName ? (
        <p className="text-slate-400">
          {greeting} {userFirstName} {userLastName},
        </p>
      ) : (
        <p className="text-slate-400">{greeting},</p>
      )}

      <h2 className={`${kanit.className} text-3xl`}>
        Ready to Find your next car.
      </h2>
    </div>
  );
}

export default Greeting;
