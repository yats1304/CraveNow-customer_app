import { Restaurant } from "./restaurant.types";

export interface RecentSearch {
  keyword: string;
  searchedAt: number;
}

export interface SearchRestaurantParams {
  page?: number;
  limit?: number;
  search?: string;
  cuisineId?: string;
  categoryId?: string;
  foodType?: string;
  minRating?: number;
  isOpen?: boolean;
  latitude?: number;
  longitude?: number;
  radius?: number;
  sortBy?: string;
}

export interface Cuisine {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
}

// export interface Restaurant {
//   _id: string;
//   name: string;
//   description: string;
//   logo: {
//     url: string;
//     publicId: string;
//   };
//   banner: {
//     url: string;
//     publicId: string;
//   };
//   restaurantType: string;
//   minimumOrderAmount: number;
//   deliveryRadius: number;
//   averagePreparationTime: number;
//   averageRating: number;
//   totalReviews: number;
//   isOpen: boolean;
//   isVerified: boolean;
//   cuisines: Cuisine[];
//   distance: number | null;
// }

export interface SearchRestaurantResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  data: Restaurant[];
}
