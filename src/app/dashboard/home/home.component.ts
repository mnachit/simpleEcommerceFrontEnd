import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.guard';
import { product } from 'src/app/model/product';
import { UserUserModel } from 'src/app/model/user-model';
import { AllertService } from 'src/app/service/dash/allert.service';
import { HomeService } from 'src/app/service/dash/home.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products!: product[];
  product: product = new product();
  checkRole: boolean = true;
  user: UserUserModel = new UserUserModel();
  id: number = 0;
  constructor(private home:HomeService, private router: Router,
    private allert: AllertService, private token: AuthorizedGuardService, private UserService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.id = this.token.getIdFromToken();
    this.getUserById();
    this.home.getProducts(this.id).subscribe(
      (data: { message: String, result: product[] }) => {
        this.products = data.result;
        console.log(this.products);
        
      },
      (error: { message: string }) => {
        console.log();
        
      }
    );

    this.home.getAllProducts().subscribe(
      (data: { message: String, result: product[] }) => {
        this.products = data.result;
        console.log(this.products);
        
      },
      (error: { message: string }) => {
        console.log();
        
      }
    );

    if (this.token.getRoleFromToken() !== 'ADMIN'){
      this.checkRole = false;
    }
  }

  getUserById(): void {
    this.UserService.getUserById().subscribe(
      (data: { message: String, result: UserUserModel }) => {
        this.user = data.result;
        console.log(this.user);
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

  addProductToSession(id: number): void {
    if (sessionStorage.getItem('product_'+id) !== null){
      console.log("Product is not in session");
      this.allert.showError("Product is already in session", 2000);
    }
    else{
    this.home.getProductById(id.toString()).subscribe(
      (data: { message: string, result: product }) => {
        this.product = data.result;
        this.product.quantity = 1;
        sessionStorage.setItem('product_'+id, JSON.stringify(this.product));
        this.allert.showSuccess("Product added to session", 2000);
      }
    );
  }
  }

  
}
