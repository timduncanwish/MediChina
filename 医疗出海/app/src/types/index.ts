export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  category: "comprehensive" | "focused";
  durationEstimate: string;
  partnerHospital: string;
  preparationInstructions?: string | null;
  includes: string[];
  images: string[];
  calendlyEventType?: string | null;
  reviewsCount: number;
  averageRating: number;
  isActive: boolean;
  sortOrder: number;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAddOns: AddOn[];
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  verified: boolean;
  createdAt: string;
}
