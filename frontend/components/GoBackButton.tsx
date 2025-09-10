"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

const GoBackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className={className}>
      <ArrowLeftIcon className="size-6 text-black" />
    </div>
  );
};

export default GoBackButton;
