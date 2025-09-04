import { Request, Response, NextFunction } from "express";

import restaurantServices from './restaurant.services'

export default {
    getRestaurants: async(req: Request, res: Response, next: NextFunction) => {
        const limit = Number(req.query.limit) || 20
        const page = Number(req.query.page) || 1
        const category = req.query.category as string || 'hi'
        const sort = req.query.sort as string|| 'name'
        const sortBy = req.query.sortBy as string|| 'asc'

        if(!limit || !page) {
            return res.status(400).json({ message: 'missing limit or page query'})
        }

        try {
            const { restaurant, totalPages, currentPage, itemPerPage } = await restaurantServices.getRestaurants(
                limit, page, category, sort, sortBy
            )

            res.status(200).json({
                restaurant:restaurant,
                pagination: {
                    totalPages,
                    currentPage,
                    itemPerPage,
                    hasNextPage: currentPage < totalPages,
                    hasPreviousPage: currentPage > 1
                }
            })
        } catch(error) {
            console.error('Error during get restaurants')
        }

    }
}