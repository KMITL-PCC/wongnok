import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const SecondaryRestaurantCard = () => {
  return (
    <Card className="gap-2 p-0 pb-2">
      <CardHeader className="flex flex-col gap-2 p-0">
        <div className="relative w-full h-40">
          <Image
            src="/food1.png"
            alt="Pad Thai"
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardTitle className="px-2 md:px-4">ผัดไทย</CardTitle>
        <CardDescription className="px-2 md:px-4">
          ผัดไทยออนไลน์
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 px-2 text-sm md:px-4">
        <p>Star</p>
        <p>Review</p>
      </CardContent>
    </Card>
  );
};
export default SecondaryRestaurantCard;
