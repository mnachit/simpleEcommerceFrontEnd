import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/model/product';
import { AllertService } from 'src/app/service/dash/allert.service';
import { HomeService } from 'src/app/service/dash/home.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  products!: product[];
  product: product = new product();
  constructor(private home:HomeService, private router: Router,
    private allert: AllertService) { }

  newProduct(): void {
    this.home.createProduct(this.product).subscribe(
      (data: { message: string }) => {
        this.allert.showSuccess(data.message, 2000);
        // this.router.navigate(['']);
      },
      (error: { message: string }) => {
        console.error(this.products);
        this.allert.showError("Product was not created", 2000);
      }
    );
  }
}
