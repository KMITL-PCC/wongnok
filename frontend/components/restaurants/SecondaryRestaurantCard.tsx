import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface RestaurantProps {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

const SecondaryRestaurantCard = ({
  restaurant,
  className,
}: {
  restaurant: RestaurantProps;
  className?: string;
}) => {
  return (
    <Card className={cn("gap-2 pt-0", className)}>
      <CardHeader className="flex flex-col gap-2 p-0">
        <div className="relative w-full h-30 md:h-40">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardTitle className="px-6">{restaurant.name}</CardTitle>
        {/* <CardDescription className="px-6">
          {restaurant.description}
        </CardDescription> */}
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2 px-6 text-sm">
        <p>{restaurant.rating} ⭐</p>
        <p>{restaurant.reviews} reviews</p>
      </CardContent>
    </Card>
  );
};
export default SecondaryRestaurantCard;
