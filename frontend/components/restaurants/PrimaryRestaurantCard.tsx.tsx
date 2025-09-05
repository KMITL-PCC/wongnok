import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const PrimaryRestaurantCard = () => {
  return (
    <Card className="gap-2">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="relative w-full border border-border h-30 rounded-xl md:h-40">
            <Image
              src="/food1.png"
              alt="Pad Thai"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative w-full h-30 rounded-xl md:h-40">
            <Image
              src="/food1.png"
              alt="Pad Thai"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative hidden w-full h-30 rounded-xl md:block md:h-40">
            <Image
              src="/food1.png"
              alt="Pad Thai"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative hidden w-full h-30 rounded-xl md:h-40 lg:block">
            <Image
              src="/food1.png"
              alt="Pad Thai"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
        <CardTitle>ผัดไทย</CardTitle>
        <CardDescription>ผัดไทยออนไลน์</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-2 text-sm">
        <p>Star Rating</p>
        <p>Review Count</p>
      </CardContent>
    </Card>
  );
};
export default PrimaryRestaurantCard;
