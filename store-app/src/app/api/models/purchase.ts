import { Product } from 'src/app/products/product.model';

export interface User {
  Id: string;
  name: string;
  creditNumber: string;
}

export interface Purchase {
user: User;
product: Product;
}
