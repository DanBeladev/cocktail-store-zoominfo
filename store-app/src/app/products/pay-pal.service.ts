import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { User, Purchase } from '../api/models/purchase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {
public product: Product;
public isTransactionCompleted = false;
public BASE_URL = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  transactionCompleted = (data) => {
    const {payer} = data;
    const shipping = data.purchase_units[0].shipping;
    const payerAddress = shipping.address.address_line_1 + shipping.address.address_line_2 +
                        shipping.address.address_line_3 + shipping.address.country_code;

    console.log(data);
    const userDetails: User = {
      _id: payer.payer_id,
      name: payer.name.given_name + ' ' + payer.name.surname,
      address: payerAddress,
      emailAddress: payer.email_address,
      phoneNumber: payer.phone.phone_number.national_number
    };

    const cocktail: Product = this.product;
    const purchase: Purchase = {
      _id: data.id,
      createdDate: data.create_time,
      status: data.status,
      product: cocktail,
      user: userDetails
    };


    this.http.post<Purchase>(this.BASE_URL + '/purchases', purchase).subscribe((purchases) => {
     alert('purchases after post request: ' + purchases._id);
    });

    this.isTransactionCompleted = true;
  }
}
