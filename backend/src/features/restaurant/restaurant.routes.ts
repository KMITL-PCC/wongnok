import { Router } from "express";
import multer from "multer";

import restaurantControlles from "./restaurant.controllers";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create",
  upload.array("images", 4),
  restaurantControlles.createRestaurant
);
router.get("/get", restaurantControlles.getRestaurants);
router.get("/get/:id", restaurantControlles.getInformation);

export default router;
