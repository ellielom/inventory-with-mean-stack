import { Component } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http'
import { NodeService } from '../node.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  outMsg: any
  productId: any
  description: any
  quantity: any
  price: any
  reorder: any
  outRec: any = []

  constructor(private node: NodeService, private alertController: AlertController) { }

  insert() {
    // enforce double decimal
    this.price = Number(this.price).toFixed(2)

    const params = { id: this.productId, description: this.description, quantity: this.quantity, price: this.price, reorder: this.reorder }
    this.node.insert(params)
      .subscribe(data => {
        this.outMsg = 'Record added.';
        this.outRec = []
        this.alert()

      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          this.outMsg = err.message
        })
  }


  async alert() {
    const alert = await this.alertController.create({
      header: 'Product Added',
      message: 
      "<b>" + this.productId + "</b>: " + this.description + "($" + this.price + "). " + this.quantity + " in stock; reorder when only " + this.reorder + " in stock.",
      buttons: ['OK']
    });

    await alert.present();
  }


}
