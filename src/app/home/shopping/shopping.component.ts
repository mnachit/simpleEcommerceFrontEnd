import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/product';
import { AllertService } from 'src/app/service/dash/allert.service';
import { HomeService } from 'src/app/service/dash/home.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  products!: product[];
  Subtotal: number = 0;
  Total: number = 1;
  constructor(private home:HomeService,private allert: AllertService) { }

  ngOnInit(): void {
    this.products = this.getStoredProducts();
    console.log(this.products);
  }
  private getStoredProducts(): product[] {
    const products: product[] = [];
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('product_')) {
        const product = sessionStorage.getItem(key);
        if (product) {
          products.push(JSON.parse(product));
        }
      }
    }

    
    
    return products;
  }

  

  removeProduct(id: number): void {
    const productKey = 'product_' + id;
    sessionStorage.removeItem(productKey);
    this.products = this.products.filter(product => product.id !== id);
    this.allert.showSuccess("Product removed from session", 2000);
  }

  updatequantityinsession(id: number, quantity: number): void {
    // console.log('updatequantityinsession');
    
    const productKey = 'product_' + id;
    const product = sessionStorage.getItem(productKey);
    if (product) {
      const productObj = JSON.parse(product);
      productObj.quantity = quantity;
      sessionStorage.setItem(productKey, JSON.stringify(productObj));
    }
    // this.allert.showSuccess("Quantity updated", 2000);
  }

}
