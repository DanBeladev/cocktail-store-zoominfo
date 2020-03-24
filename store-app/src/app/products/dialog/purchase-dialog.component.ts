import { Component } from '@angular/core';
import {NgForm } from '@angular/forms';
import { User, Purchase } from 'src/app/api/models/purchase';
import { Product } from '../product.model';


@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent {
  title = 'store-app';

  onPurchaseHandler(purchaseForm: NgForm) {
    if (purchaseForm.invalid) {
      console.log('not valid form', purchaseForm);
      return;
    }

    const userInput: User = {
      Id: purchaseForm.value.userId,
      name: purchaseForm.value.userName,
      creditNumber: purchaseForm.value.userCreditNumber
    };

    const productInput: Product = {
      _id: '1',
      description: 'desc',
      picture: 'dsadasd',
      price: '213',
      title: 'dasdas'
    };

    const purchase: Purchase = {
      product: productInput,
      user: userInput
    };

    console.log(purchase);
    purchaseForm.resetForm();
  }
}
