import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  public products: Product[] = [];
  // private productsUpdated = new Subject<Product[]>();

  getProducts() {
    this.http
      .get<Product[]>(`${environment.API_URL}/products`, {
        responseType: 'json'
      })
      .subscribe(productsApi => {
        productsApi.forEach(product => this.products.push(product));
      });
  }

  // getproductUpdateListener() {
  //   return this.productsUpdated.asObservable();
  // }
}
