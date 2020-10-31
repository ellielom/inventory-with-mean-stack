import { Component } from '@angular/core';
import { NodeService } from '../node.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../product'
import { LoadproductsService } from '../loadproducts.service';
//import * as baseproducts from '../../assets/data/baseproducts.json'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  database: any
  collection: any
  products: Product[]

  outRec: any
  message = ""

  fade: any

  constructor(private node: NodeService, private loadproductsService : LoadproductsService) {   }

  ngOnInit() {

    this.products = this.loadproductsService.products
    console.log(this.products)


    for (var i = 1; i <= 5; i++) {
      var div = document.getElementById("div" + i)
      var time = 800 * i * 1.2;
      div.animate({ opacity: [0, 0, 1] }, time)
    }
  }

  createEmptyCollection() {
    const params = { database: this.database, collection: this.collection, input: this.products }
    this.node.createEmptyCollection(params)
      .subscribe(data => {
        console.log(data)
        this.outRec = data
        this.message = this.outRec.message
      },
        (err: HttpErrorResponse) => {
          console.log(err.message)
        })
  }



  createSampleCollection() {
    const params = { database: this.database, collection: this.collection, input: this.products }
    this.node.createSampleCollection(params)
      .subscribe(data => {
        console.log(data)
        this.outRec = data
        this.message = this.outRec.message
      },
        (err: HttpErrorResponse) => {
          console.log(err.message)
        })

  }


}
