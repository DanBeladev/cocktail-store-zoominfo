import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import {productsList} from '../mocks/products';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  public products: Product[] = []; /* = this.getProducts(); */
  private productsUpdated = new Subject<Product[]>();

  getProducts() {
    this.http.get<Product[]>('http://localhost:3000/products', {responseType: 'json'})
      .subscribe((productsApi) => {productsApi.forEach(product => this.products.push(product)); });
  }



  getproductUpdateListener() {
    return this.productsUpdated.asObservable();
  }
  addProduct(title: string, content: string) {
    const product = { title, content };
    this.http.post<Product>('http://localhost:3000/notes', product, { responseType: 'json' })
    .subscribe((data) => this.products.push(data));
    this.productsUpdated.next([...this.products]);
  }

  deleteProduct(noteId: string) {
    this.http.delete<Product>(`http://localhost:3000/notes/${noteId}`)
    .subscribe((data) => {
      console.log(data);
      // debugger;
      // this.products.filter((p) => p._id !== noteId);
    });
    // console.log(this.products);
    this.productsUpdated.next([...this.products]);
  }
}
