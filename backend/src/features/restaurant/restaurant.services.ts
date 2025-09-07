import { equal } from "assert";
import prisma from "../../config/db.config";
import { Restaurant } from "../../types/restaurant";

export default {
  getRestaurants: async (data: Restaurant.query) => {
    const { limit, page, category, sort, sortBy, search, rating, priceRate } =
      data;

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

    //4. rating
    if (rating !== 0) {
      whereClause.avgRating = {
        gte: rating,
      };
    }

    //5. price rate
    if (priceRate !== "") {
      let price;
      if (priceRate === "40") {
        price = {
          lte: 40,
        };
      } else if (priceRate === "40-100") {
        price = {
          gte: 40,
          lte: 100,
        };
      } else {
        price = {
          gte: 100,
        };
      }
      whereClause.minPrice = {
        ...price,
      };
    }

    //6. query database
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
        images: {
          select: {
            imageUrl: true,
          },
        },
      },
    });

    //7. find total
    const total = await prisma.restaurant.count({
      where: whereClause,
    });

    //8. map data
    const restaurant = restaurantInfo.map((data) => {
      return {
        name: data.name,
        totalReviews: data.totalReviews,
        avgRating: data.avgRating,
        status: data.status,
        categories: data.categories.map((cate) => cate.category.name),
        images: data.images.map((image) => image.imageUrl),
      };
    });

    return {
      restaurant: restaurant,
      totalPages: Math.ceil(total / limit),
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
