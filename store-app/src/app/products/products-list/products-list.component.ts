import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEventPattern } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { MatDialog} from '@angular/material/dialog';
import {PurchaseDialogComponent } from '../dialog/purchase-dialog.component';
import { PaypalcomponentComponent } from '../dialog/paypalcomponent/paypalcomponent.component';
import { PayPalService } from '../pay-pal.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
products: Product[] = this.productService.products;
private productsSub: Subscription;

 constructor(public paypalService: PayPalService, public productService: ProductService, public dialog: MatDialog) {}

openBuyDialog(product) {
  // this.dialog.open(PurchaseDialogComponent);
  // this.payPalSercice.getProduct(product);
  this.paypalService.product = product;
  const dialogRef = this.dialog.open(PaypalcomponentComponent, {
    data: product
  });

  dialogRef.afterClosed().subscribe(resulet => {
    console.log('The dialog wsa closed');
  });
}


 ngOnInit() {
   this.productService.getProducts();
 }

 ngOnDestroy() {
   this.productsSub.unsubscribe();
 }
}
