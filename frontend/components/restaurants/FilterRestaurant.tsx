"use client";

import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

const FilterRestaurant = () => {
  return (
    <>
      <Card className="hidden w-50 md:flex lg:w-70">
        <CardContent className="flex flex-col gap-4 px-0">
          {/* Category */}
          <div className="flex flex-col gap-3 px-3">
            <h1 className="font-semibold text-md">Category</h1>
            <div className="flex items-center gap-2">
              <Checkbox id="category1" />
              <Label htmlFor="category1">Category 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="category2" />
              <Label htmlFor="category2">Category 2</Label>
            </div>
          </div>

          <Separator />

          {/* Rating */}
          <div className="flex flex-col gap-3 px-3">
            <h1 className="font-semibold text-md">Rating</h1>
            <div className="flex items-center gap-2">
              <Checkbox id="rating2" />
              <Label htmlFor="rating2">2.0+</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="rating5" />
              <Label htmlFor="rating5">5.0+</Label>
            </div>
          </div>

          <Separator />

          {/* Price */}
          <div className="flex flex-col gap-3 px-3">
            <h1 className="font-semibold text-md">Price</h1>
            <div className="flex items-center gap-2">
              <Checkbox id="price1" />
              <Label htmlFor="price1">Price 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="price2" />
              <Label htmlFor="price2">Price 2</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden">
            ร้านอาหาร <ChevronDown />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="py-6">
          {/* Category */}
          <div className="flex flex-col gap-3 px-3">
            <h1 className="font-semibold text-md">Category</h1>
            <div className="flex items-center gap-2">
              <Checkbox id="category1" />
              <Label htmlFor="category1">Category 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="category2" />
              <Label htmlFor="category2">Category 2</Label>
            </div>
          </div>

          <Separator />

          {/* Rating */}
          <div className="flex flex-col gap-3 px-3">
            <h1 className="font-semibold text-md">Rating</h1>
            <div className="flex items-center gap-2">
              <Checkbox id="rating2" />
              <Label htmlFor="rating2">2.0+</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="rating5" />
              <Label htmlFor="rating5">5.0+</Label>
            </div>
          </div>

          <Separator />

          {/* Price */}
          <div className="flex flex-col gap-3 px-3">
            <h1 className="font-semibold text-md">Price</h1>
            <div className="flex items-center gap-2">
              <Checkbox id="price1" />
              <Label htmlFor="price1">Price 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="price2" />
              <Label htmlFor="price2">Price 2</Label>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default FilterRestaurant;
