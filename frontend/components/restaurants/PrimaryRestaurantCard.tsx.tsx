import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface RestaurantProps {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

const PrimaryRestaurantCard = ({
  restaurant,
}: {
  restaurant: RestaurantProps;
}) => {
  return (
    <Card className="gap-2">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="relative w-full border border-border h-30 rounded-xl md:h-40">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative w-full border border-border h-30 rounded-xl md:h-40">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative hidden w-full border border-border h-30 rounded-xl md:block md:h-40">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative hidden w-full border border-border h-30 rounded-xl md:h-40 lg:block">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
        <CardTitle>{restaurant.name}</CardTitle>
        <CardDescription>{restaurant.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-2 text-sm">
        <p>{restaurant.rating} ⭐</p>
        <p>{restaurant.reviews} reviews</p>
      </CardContent>
    </Card>
  );
};
export default PrimaryRestaurantCard;
