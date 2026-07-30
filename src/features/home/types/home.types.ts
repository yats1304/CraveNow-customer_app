export interface HomeHeaderProps {
  userName: string;
  address: string;
  onAddressPress: () => void;
  onNotificationPress: () => void;
}

export interface SearchBarProps {
  placeholder?: string;
  onPress: () => void;
}

export interface Image {
  url: string;
  publicId: string;
}

export interface HomeSection<T> {
  title: string;
  data: T[];
}

export interface Banner {
  _id: string;
  image: Image;
  priority: number;
  isActive: boolean;
}

export interface Cuisine {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: Image | null;
}

export interface Category {
  _id: string;
  restaurantId: string;
  name: string;
  slug: string;
  description: string;
  image: Image | null;
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  logo: Image;
  banner: Image;
  restaurantType: string;
  averageRating: number;
  totalReviews: number;
  minimumOrderAmount: number;
  averagePreparationTime: number;
  deliveryRadius: number;
  isOpen: boolean;
  isVerified: boolean;
}

export interface FeaturedMenuItem {
  _id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  foodType: string;
  preparationTime: number;
  images: Image[];
  isAvailable: boolean;
  isFeatured: boolean;
}

export interface HomeData {
  banners: HomeSection<Banner>;
  cuisines: HomeSection<Cuisine>;
  categories: HomeSection<Category>;
  featuredRestaurants: HomeSection<Restaurant>;
  nearbyRestaurants: HomeSection<Restaurant>;
  featuredMenuItems: HomeSection<FeaturedMenuItem>;
}

export interface HomeResponse {
  success: boolean;
  message: string;
  data: HomeData;
}
