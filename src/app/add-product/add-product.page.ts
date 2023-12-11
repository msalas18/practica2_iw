import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage {
  public productForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private productService: ProductService,
    private toastController:ToastController,
    private router: Router) {

    this.productForm = this.formBuilder.group({
      name: ['',Validators.required],
      price: [0,Validators.required],
      description: [''],
      type: ['',Validators.required],
      photo: ['',Validators.required],
    });
    
   }
   public async addProduct(){
    const product = this.productForm.value;
    this.productService.addProduct(product);

    const toast = await this.toastController.create({
      message: 'Se agregó el producto',
      duration: 2000,
      position: 'top',
    });
    toast.present();

    this.router.navigate(['/tabs/tab1']);
   }



}
