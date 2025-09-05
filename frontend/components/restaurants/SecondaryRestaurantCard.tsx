import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

const SecondaryRestaurantCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("gap-2 pt-0", className)}>
      <CardHeader className="flex flex-col gap-2 p-0">
        <div className="relative w-full h-30 md:h-40">
          <Image
            src="/food1.png"
            alt="Pad Thai"
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardTitle className="px-6">ผัดไทย</CardTitle>
        <CardDescription className="px-6">ผัดไทยออนไลน์</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 px-6 text-sm">
        <p>Star</p>
        <p>Review</p>
      </CardContent>
    </Card>
  );
};
export default SecondaryRestaurantCard;
