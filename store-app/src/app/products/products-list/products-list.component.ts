import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEventPattern } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { MatDialog} from '@angular/material/dialog';
import {PurchaseDialogComponent } from '../dialog/purchase-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
products: Product[] = this.productService.products;
private productsSub: Subscription;

 constructor(public productService: ProductService, public dialog: MatDialog) {}

 onDeleteProduct(id: string) {
  // this.productService.deleteProduct(id);
}

openBuyDialog() {
  this.dialog.open(PurchaseDialogComponent);
  console.log('buy');
}

 ngOnInit() {
   this.productService.getProducts();
 }

 ngOnDestroy() {
   this.productsSub.unsubscribe();
 }
}
