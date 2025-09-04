import FilterButton from "@/components/restaurants/FilterButton";
import RestaurantCard from "@/components/restaurants/RestaurantCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RestaurantsPage = () => {
  return (
    <div className="flex flex-col p-4 md:flex-row md:p-8">
      <div>Filter</div>
      <div className="flex flex-col flex-1 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <FilterButton />
                <FilterButton />
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-3 gap-4">
              <RestaurantCard />
              <RestaurantCard />
              <RestaurantCard />
            </CardContent>
          </Card>
        </div>
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
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Restaurants</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default RestaurantsPage;
