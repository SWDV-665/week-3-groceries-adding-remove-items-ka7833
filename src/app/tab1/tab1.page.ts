import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { GroceryItem } from '../GroceryItem';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  title = "Grocery";
  // Array of objects
  items: GroceryItem[] = [];
  // items = [
  //   {
  //     name: "Milk",
  //     quantity: 2
  //   },
  //   {
  //     name: "Bread",
  //     quantity: 1
  //   },
  //   {
  //     name: "Banana",
  //     quantity: 3
  //   },
  //   {
  //     name: "Sugar",
  //     quantity: 1
  //   }
  // ];

  // in order to use a service you have to add it as a provider into the constructor
  constructor(private groceryService: GroceryService, private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit(){
    this.groceryService.getGroceries().subscribe((items) => this.items = items)
  }
  async removeItem(item: any, index: any) {
    console.log("Removing item -", index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + this.items[index].name,
      duration: 1500
    });

    this.items.splice(index, 1);
    await toast.present();
  }

  addItem() {
    console.log("Adding item -");
    this.presentAlert()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add Item',
      message: "Please enter item...",
      inputs: [{
        name: "name",
        placeholder: "Name"
      },
      {
        name: "quantity",
        placeholder: "Quantity"
      }
      ],
      buttons: [{
        text: "Cancel",
        handler: data => {
          console.log("Cancel clicked")
        }
      },
      {
        text: "Save",
        handler: item => {
          console.log("Save clicked", item);
          this.items.push(item)
        }
      }]
    });

    await alert.present();
  }
}
