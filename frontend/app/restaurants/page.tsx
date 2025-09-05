import FilterRestaurant from "@/components/restaurants/FilterRestaurant";
import PrimaryRestaurantCard from "@/components/restaurants/PrimaryRestaurantCard.tsx";
import RecommendFilterButton from "@/components/restaurants/RecommendFilterButton";
import SecondaryRestaurantCard from "@/components/restaurants/SecondaryRestaurantCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RestaurantsPage = async () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:p md:flex-row">
      {/* Filter */}
      <div>
        <FilterRestaurant />
      </div>

      <div className="flex flex-col flex-1 gap-4">
        {/* Recommended Restaurants */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <RecommendFilterButton filter="popular" />
                <RecommendFilterButton filter="new" />
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <SecondaryRestaurantCard />
              <SecondaryRestaurantCard />
              <SecondaryRestaurantCard className="hidden md:flex" />
              <SecondaryRestaurantCard className="hidden lg:flex" />
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Map</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        </div>

        {/* Restaurants List*/}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Restaurants</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-4">
              <PrimaryRestaurantCard />
              <PrimaryRestaurantCard />
              <PrimaryRestaurantCard />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default RestaurantsPage;
