import { Request, Response, NextFunction } from "express";

import restaurantServices from "./restaurant.services";

function validateNestedFields(obj: any, requiredFields: string[]): string[] {
  return requiredFields.filter((field) => !obj?.[field]);
}

export default {
  createRestaurant: async (req: Request, res: Response, next: NextFunction) => {
    //     {
    // information: {
    //        "name",
    //       "description",
    //       "address",
    //       "latitude",
    //       "longitude",
    // },
    // price: {
    //       "minPrice",
    //       "maxPrice"
    // },
    // time : {
    //       "weekday",
    //       "opentime",
    //       "closetime"
    // }
    // }
    const { information, price, time } = req.body;

    const missingInfo = validateNestedFields(information, [
      "name",
      "description",
      "address",
      "latitude",
      "longitude",
    ]);
    const missingPrice = validateNestedFields(price, ["minPrice", "maxPrice"]);
    const missingTime = validateNestedFields(time, [
      "weekday",
      "opentime",
      "closetime",
    ]);

    if (
      missingInfo.length > 0 ||
      missingPrice.length > 0 ||
      missingTime.length > 0
    ) {
      return res.status(400).json({ message: "Missing data" });
    }

    try {
      const result = await restaurantServices.createRestaurant(
        information,
        price,
        time
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during create restaurant ERROR:", error.message);
      } else {
        console.error("Error during create restaurant ERROR:", error);
      }

      res.status(500).json({
        message: "Error during create restaurant",
      });
    }
  },

  getRestaurants: async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const category = (req.query.category as string) || "";
    const sort = (req.query.sort as string) || "desc";
    const sortBy = (req.query.sortBy as string) || "name";
    const search = (req.query.search as string) || "";

    if (!limit || !page) {
      return res.status(400).json({ message: "missing limit or page query" });
    }

    try {
      const { restaurant, totalPages, currentPage, itemPerPage } =
        await restaurantServices.getRestaurants(
          limit,
          page,
          category,
          search,
          sort,
          sortBy
        );

      res.status(200).json({
        restaurant: restaurant,
        pagination: {
          totalPages,
          currentPage,
          itemPerPage,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during get restaurants ERROR:", error.message);
      } else {
        console.error("Error during get restaurants ERROR:", error);
      }
      res.status(500).json({
        message: "Server error during get restaurants",
      });
    }
  },
};
