import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http : HttpClient) { }

  createEmptyCollection(params) {
    return this.http.post('http://127.0.0.1:8887/createEmptyCollection/', { params })
  }

  createSampleCollection(params) {
    return this.http.post('http://127.0.0.1:8887/createSampleCollection/', { params })
  }

  insert(params) {
    return this.http.post('http://127.0.0.1:8887/insert/', { params })
  }

  insertMany(params) {
    return this.http.post('http://127.0.0.1:8887/insertMany/', { params })
  }

  retrieve(params) {
    return this.http.get('http://127.0.0.1:8887/retrieve/', { params })
  } 

  productList() {
    return this.http.get('http://127.0.0.1:8887/products/');
  }

  retrieveBaseProducts() {
    return this.http.get('http://127.0.0.1:8887/retrieveBaseProducts/');
  }

  edit(params) {
    return this.http.put('http://127.0.0.1:8887/edit/', { params });
  }

  deleteOne(params) {
    return this.http.delete('http://127.0.0.1:8887/deleteOne/', { params });
  }
  
  deleteAll() {
    return this.http.delete('http://127.0.0.1:8887/deleteAll/');
  }


}
