import { Injectable } from '@angular/core';
import * as baseproducts from '../assets/data/baseproducts.json'

@Injectable({
  providedIn: 'root'
})
export class LoadproductsService {

  products = baseproducts.products

  constructor() { }

  loadProducts() {
    return baseproducts
  }
}
