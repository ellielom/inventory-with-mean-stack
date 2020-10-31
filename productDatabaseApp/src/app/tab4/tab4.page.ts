import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  searchProductId: any

  productId: any
  description: any
  quantity: any
  price: any
  reorder: any

  outRecObj: any = []
  outRec: any
  outMsg: any

  prodListObj: any = []
  prodListHidden = true
  formHidden = true

  isDisabled = true
  isHidden = true

  editedRecObj: any = []
  editMsg: any

  deleteMsg: any
  anyProds = false

  constructor(private node: NodeService, private alertController: AlertController) { }

  ngOnInit() { }

  searchProducts() {

    const params = { id: this.searchProductId }

    this.node.retrieve(params)
      .subscribe(data => {
        console.log("data")
        console.log(data)
        if (data[0] != null) {
          this.outRecObj = data;
          this.outRec = data[0];
          this.outMsg = this.outRecObj.length + ' records retrieved'
          this.setupProduct()
        }
        else {
          this.outMsg = 'Product not found '
        }

      },
        (err: HttpErrorResponse) => {
          console.log(err.message)
          this.outMsg = err.message
        })

    this.editMsg = ""
    this.formHidden = false

  }

  retrieveProducts() {
    this.node.retrieveBaseProducts()
      .subscribe(data => {
        this.prodListObj = data;
        if (data[0] != null)
          this.anyProds = true
        else
          this.anyProds = false
      },
        (err: HttpErrorResponse) => {
          console.log(err.message)
        })
  }

  toggleProductList() {
    this.retrieveProducts()
    this.prodListHidden = !this.prodListHidden
  }

  setupProduct() {
    this.productId = this.outRec.id
    this.description = this.outRec.description
    this.quantity = this.outRec.quantity
    this.price = this.outRec.price
    this.reorder = this.outRec.reorder
  }

  editProduct() {
    this.isDisabled = false
    this.isHidden = false
  }

  cancelEdit() {
    this.isDisabled = true
    this.isHidden = true
  }

  saveChanges() {
    // enforce double decimal
    this.price = Number(this.price).toFixed(2)

    var params = {
      search: this.outRec.id,
      change: {
        id: this.productId,
        quantity: this.quantity,
        description: this.description,
        price: this.price,
        reorder: this.reorder
      }
    }

    this.node.edit(params)
      .subscribe(data => {
        this.editedRecObj = data;
        console.log(this.editedRecObj)
        this.editMsg = this.editedRecObj.message
      },
        (err: HttpErrorResponse) => {
          console.log(err.message)
          this.editMsg = err.message
        })

    this.isDisabled = true
    this.isHidden = true

  }

  async deleteProduct() {
    const alert = await this.alertController.create({
      header: 'Delete Product',
      subHeader: (this.productId + ': ' + this.description),
      message: 'Are you sure you want to delete this product? ',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('yes')

            // delete
            var params = { id: this.productId }
            this.node.deleteOne(params)
              .subscribe(data => {
                console.log('Delete data')
                console.log(data)
                this.editMsg = data;
                this.editMsg = this.editMsg.message
                console.log(this.editMsg)
                //this.editMsg = this.editedRecObj.message
              },
                (err: HttpErrorResponse) => {
                  console.log(err.message)
                  this.editMsg = err.message
                })

            console.log('delete done')
            console.log(this.editMsg)

            // remove product from form display
            this.formHidden = true
          }

        },
        'No'
      ]
    });

    await alert.present();
  }



  async deleteAllProducts() {
    const alert = await this.alertController.create({
      header: 'Delete All Products',
      // subHeader: (this.productId + ': ' + this.description),
      message: 'Are you sure you want to delete all products in the collection? ',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            // delete all
            this.node.deleteAll()
              .subscribe(data => {
                this.editMsg = data;
                this.editMsg = this.editMsg.message
                console.log(this.editMsg)
              },
                (err: HttpErrorResponse) => {
                  console.log(err.message)
                  this.editMsg = err.message
                })

            // remove products from display
            this.prodListHidden = true
          }

        },
        'No'
      ]
    });

    await alert.present();

  }

}
