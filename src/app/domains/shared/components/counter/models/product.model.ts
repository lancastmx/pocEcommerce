export interface Product {
  id?: number;
  title?: string;
  name?: string;
  description?: string;
  price: number;
  imge?:string[] | any;
  images?: string[];
  stock?: number;
  category?: string;
  rating?: number;
  reviews?: number;
  isFavorite?: boolean;
  quantity?: number;
}
