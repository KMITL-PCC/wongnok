import { equal } from "assert";
import prisma from "../../config/db.config";
import { Restaurant } from "../../types/restaurant";

export default {
  getRestaurants: async (
    limit: number = 20,
    page: number = 1,
    category: string,
    search: string,
    sort: string,
    sortBy: string
  ) => {
    const offset = (page - 1) * limit;

    let whereClause: any = {};

    //1. search field
    if (search !== "") {
      whereClause.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    //2. category field
    if (category !== "") {
      const categories = (category as string).split(",").map((c) => c.trim());
      whereClause.AND = categories.map((cate) => ({
        categories: {
          some: {
            category: {
              name: {
                equals: cate,
                mode: "insensitive",
              },
            },
          },
        },
      }));
    }

    //3. sort field
    const orderBy: any = {};
    const sortField = sortBy || "avgRating";
    const sortOrder = (sort as "asc" | "desc") || "desc";
    orderBy[sortField] = sortOrder;

    console.log(orderBy);

    //
    const restaurantInfo = await prisma.restaurant.findMany({
      skip: offset,
      take: limit,
      where: whereClause,
      orderBy,
      select: {
        name: true,
        totalReviews: true,
        avgRating: true,
        status: true,
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    console.log(restaurantInfo);

    return {
      restaurant: restaurantInfo,
      totalPages: page,
      currentPage: page,
      itemPerPage: limit,
    };
  },

  createRestaurant: async (
    information: Restaurant.information,
    price: Restaurant.price,
    time: Restaurant.time
  ) => {
    const restaurant = await prisma.$transaction(async (tx) => {
      await tx.restaurant.create({
        data: {
          name: information.name,
          description: information.description,
          address: information.address,
          latitude: information.latitude,
          longitude: information.longitude,
          minPrice: price.minPrice,
          maxPrice: price.maxPrice,

          openninghour: {
            create: {
              openTime: time.opentime,
              closeTime: time.closetime,
              weekday: time.weekday,
            },
          },
        },
      });
    });
  },
};
