"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ClearButton() {
  const router = useRouter();

  function clearFilters() {
    window.location.replace("/#listings");
  }

  return (
    <Button
      variant="ghost"
      className="dark:text-slate-400 pb-1 text-sm text-right hover:underline transition-all hover:dark:text-slate-200 px-0 w-fit hover:bg-transparent"
      onClick={() => clearFilters()}
    >
      Clear Filters
    </Button>
  );
}

export default ClearButton;
