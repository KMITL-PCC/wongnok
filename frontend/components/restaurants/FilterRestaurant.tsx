import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FilterRestaurant = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">Filter</div>
      </CardContent>
    </Card>
  );
};
export default FilterRestaurant;
