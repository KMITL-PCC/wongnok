import { Router } from "express";

import restaurantControlles from "./restaurant.controllers";

const router = Router();

router.post("/create", restaurantControlles.createRestaurant);
router.get("/get", restaurantControlles.getRestaurants);
router.get("/get/:id", restaurantControlles.getInformation);

export default router;
