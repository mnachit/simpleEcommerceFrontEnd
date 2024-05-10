import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.guard';
import { product } from 'src/app/model/product';
import { AllertService } from 'src/app/service/dash/allert.service';
import { HomeService } from 'src/app/service/dash/home.service';

@Component({
  selector: 'app-product-id',
  templateUrl: './product-id.component.html',
  styleUrls: ['./product-id.component.css']
})
export class ProductIdComponent implements OnInit{
  product!: product;
  id!: string;
  constructor(
    private home:HomeService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService,
    private route: ActivatedRoute,
    private router: Router,
    private token: AuthorizedGuardService
  ) {}

  getProductById(id: string): void {
    this.home.getProductById(id).subscribe
    ({
      next: (data: {message: string, result: product}) => {
        this.product = data.result;
        // this.checkId = true;
        console.log(this.product);
        
      },
      error: (e) => 
      {
        this.router.navigate(['/404']);
      }
    });
  }

  updateProduct(): void {
    this.product.userId = this.token.getIdFromToken();
    this.home.updateProduct(this.id, this.product).subscribe(
      (data: { message: string }) => {
        this.allert.showSuccess(data.message, 2000);
      },
      (error: { message: string }) => {
        console.error(this.product);
        this.allert.showError("Product was not updated", 2000);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getProductById(params['id']);
      this.id = params['id'];
    });
    
  }

}
