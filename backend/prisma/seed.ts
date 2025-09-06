import { PrismaClient, Prisma, RestaurantStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    // สร้าง Restaurant
    await prisma.$transaction(async (prisma) => {
      const restaurant = await prisma.restaurant.create({
        data: {
          name: faker.company.name(),
          description: faker.lorem.sentence(),
          address: faker.location.streetAddress(),
          latitude: new Prisma.Decimal(
            faker.location
              .latitude({
                max: 90,
                min: -90,
              })
              .toFixed(8)
          ),
          longitude: new Prisma.Decimal(
            faker.location
              .longitude({
                max: 180,
                min: -180,
              })
              .toFixed(8)
          ),
          status: faker.helpers.arrayElement([
            RestaurantStatus.Open,
            RestaurantStatus.Closed,
            RestaurantStatus.Temporarily_Closed,
          ]),
          minPrice: new Prisma.Decimal(faker.number.int({ min: 50, max: 200 })),
          maxPrice: new Prisma.Decimal(
            faker.number.int({ min: 300, max: 1000 })
          ),
        },
      });

      // Opening Hours (ทุกวันจันทร์-อาทิตย์)
      for (let weekday = 0; weekday < 7; weekday++) {
        await prisma.openingHour.create({
          data: {
            restaurantId: restaurant.id,
            weekday,
            openTime: "09:00",
            closeTime: "21:00",
          },
        });
      }

      // Restaurant Services (serviceId 1–4)
      const serviceIds = faker.helpers.arrayElements([1, 2, 3, 4], {
        min: 1,
        max: 4,
      });
      for (const serviceId of serviceIds) {
        await prisma.restaurantService.create({
          data: {
            restaurantId: restaurant.id,
            serviceId,
          },
        });
      }

      // Restaurant Categories (categoryId 1–8)
      const categoryIds = faker.helpers.arrayElements(
        [1, 2, 3, 4, 5, 6, 7, 8],
        {
          min: 1,
          max: 3,
        }
      );
      for (const categoryId of categoryIds) {
        await prisma.restaurantCategory.create({
          data: {
            restaurantId: restaurant.id,
            categoryId,
          },
        });
      }

      // Contact (phone 10 หลัก)
      await prisma.contact.create({
        data: {
          restaurantId: restaurant.id,
          contactType: "phone",
          contactDetail: faker.phone.number({ style: "human" }), // เช่น 0912345678
        },
      });

      console.log(`✅ Created restaurant ${restaurant.name}`);
    });
  }
}

(async () => {
  try {
    console.log("start seed");
    await main();
    console.log("seed succes");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during seed ERROR: ", error.message);
    } else {
      console.error("Error during seed ERROR: ", error);
    }
  }
})();
