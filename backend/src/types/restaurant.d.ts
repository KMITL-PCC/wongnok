export declare namespace Restaurant {
  interface information {
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
  }

  interface price {
    minPrice: number;
    maxPrice: number;
  }

  interface time {
    weekday: number;
    opentime: string;
    closetime: string;
  }

  interface query {
    limit: number;
    page: number;
    category: string;
    sort: string;
    sortBy: string;
    search: string;
    rating: number;
    priceRate: string;
  }
}
