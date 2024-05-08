import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/model/product';
import { AllertService } from 'src/app/service/dash/allert.service';
import { HomeService } from 'src/app/service/dash/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products!: product[];
  constructor(private home:HomeService, private router: Router,
    private allert: AllertService) { }

  ngOnInit(): void {
    this.home.getProducts().subscribe(
      (data: { message: String, result: product[] }) => {
        this.products = data.result;
        console.log(this.products);
        
      },
      (error: { message: string }) => {
        this.allert.showError("Products not found", 2000);
      }
    );
  }

  deleteProduct(id: number): void {
    this.home.deleteProduct(id).subscribe(
      (data: { message: string }) => {
        this.allert.showSuccess(data.message, 2000);
        this.ngOnInit();
        console.log(data.message);
        
      },
      (error: { message: string }) => {
        this.allert.showError("Product was not deleted", 2000);
        console.error(error.message);
      }
    );
  }

  
}
