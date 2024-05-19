import { Component } from '@angular/core';
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
export class HomeComponent {
  products!: product[];
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
        // this.allert.showError("Products not found", 2000);
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

  
}
