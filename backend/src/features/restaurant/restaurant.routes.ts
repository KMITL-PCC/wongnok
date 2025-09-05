import { Router } from "express";

import restaurantControlles from "./restaurant.controllers"

const router = Router();

router.get('/get', restaurantControlles.getRestaurants);