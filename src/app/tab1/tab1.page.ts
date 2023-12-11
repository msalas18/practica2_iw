import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products: Product[] = [];
  public productsFounds: Product[] = [];
  public filter = [
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia",
  ];

  public colors = [
    {
      type: "Abarrotes",
      color: "primary"
    },
    {
      type: "Frutas y Verduras",
      color: "secondary"
    },
    {
      type: "Limpieza",
      color: "warning"
    },
    {
      type: "Farmacia",
      color: "danger"
    }
  ];

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private productService: ProductService,
    private alertController: AlertController,
    private toastController: ToastController
    ) {
    this.products = this.productService.getProducts();
    this.productsFounds = this.products;
  }

  public getColor(type: string): string {
    const itemFound = this.colors.find((element) => {
      return element.type === type;
    });
    let color = itemFound && itemFound.color ? itemFound.color : "";
    return color;
  }

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  public addToCart(product: Product, i: number) {
    product.photo = product.photo + i;
    this.cartService.addToCart(product);
    console.log(this.cartService.getCart());
  }

  public openAddProduct(){
    this.router.navigate(['/add-product']);
  }

  async deleteProduct(i:number) {
    const a = await this.alertController.create({
      header: 'Confirmación de eliminación',
      message: '¿Está seguro de eliminar este artículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.productService.removeProduct(i);
            const toast = await this.toastController.create({
              message: 'Se eliminó el producto',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
    await a.present();
  }

  async updateProduct(i: number, p: Product) {
    const alert = await this.alertController.create({
      header: 'Actualizar datos del artículo.',
      message: 'Edite los campos a actualizar:',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: p.name
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripción',
          value: p.description
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Precio',
          value: p.price
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Actualizar',
          handler: async (formData) => {
            const updatedProduct: Product = {
              name: formData.name,
              description: formData.description,
              price: formData.price,
              type: p.type, 
              photo: p.photo 
            };
            this.productService.updateProduct(i, updatedProduct);
            const toast = await this.toastController.create({
              message: 'Se actualizó el producto',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  
    await alert.present();
  }

}