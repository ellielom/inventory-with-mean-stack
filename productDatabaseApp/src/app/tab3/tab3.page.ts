import { Component } from '@angular/core';
import { NodeService } from '../node.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  productListObj: any
  productList: any

  productId: any

  outRec: any = []
  outMsg: any

  constructor(private node: NodeService) { }

  ngOnInit() {
    this.retrieveProducts()
  }

  retrieveProducts() {
    this.node.retrieveBaseProducts()
      .subscribe(data => {
        this.outRec = data;
        this.outMsg = this.outRec.length + ' records retrieved'
        console.log(this.outRec)
      },
        (err: HttpErrorResponse) => {
          console.log(err.message)
          this.outMsg = err.message
        })

    this.productId = ""
  }

  searchProducts() {
    const params = { id: this.productId }
    if (this.productId == '') this.retrieveProducts()
    else {
      this.node.retrieve(params)
        .subscribe(data => {
          this.outRec = data;
          this.outMsg = this.outRec.length + ' records retrieved'
        },
          (err: HttpErrorResponse) => {
            console.log(err.message)
            this.outMsg = err.message
          })
    }
  }



}
