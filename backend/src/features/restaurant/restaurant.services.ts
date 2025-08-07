
export default {
    getRestaurants: async(
        limit: number = 20, 
        page: number = 1, 
        category: string , 
        sort: string = 'name', 
        sortBy: string = 'asc'
    ) => {
        return {
            restaurant: limit, 
            totalPages: page, 
            currentPage: page, 
            itemPerPage: limit
        }
    }
}