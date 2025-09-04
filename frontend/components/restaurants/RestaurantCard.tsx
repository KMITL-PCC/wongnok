import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const RestaurantCard = () => {
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-col gap-2 p-0">
        <div className="relative w-full h-40">
          <Image
            src="/food1.png"
            alt="Pad Thai"
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardTitle className="px-2">ผัดไทย</CardTitle>
        <CardDescription className="px-2">ผัดไทยออนไลน์</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <p>RestaurantCard</p>
      </CardContent>
    </Card>
  );
};
export default RestaurantCard;
