"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/thread") ? (
        <Button
          onClick={() => router.back()}
          className="pl-2.5 flex-1"
          variant="ghost"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      ) : (
        <Button
          onClick={() => router.back()}
          className="pl-2.5 flex-1"
          variant="ghost"
          disabled
        ></Button>
      )}
    </>
  );
}
