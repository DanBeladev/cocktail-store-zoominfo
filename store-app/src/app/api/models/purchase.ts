import { Product } from 'src/app/products/product.model';

export interface User {
  // payer
  _id: string; // _id
  emailAddress: string; // email_address
  name: string; // name.given_name + name.surname
  phoneNumber: string; // phone.phone_number.national_number
  address: string; // shipping.address.address_line_1 + shipping.address.address_line_2 +
  // shipping.address.address_line_3 + shipping.address.country_code
}

export interface Purchase {
_id: string;
createdDate: Date;
status: string;
user: User;
product: Product;
}
