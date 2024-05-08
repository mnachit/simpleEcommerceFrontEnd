import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUserModel } from 'src/app/model/user-model';
import { AllertService } from 'src/app/service/dash/allert.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  userRegister!: UserUserModel;

  ngOnInit(): void {
    this.userRegister = new UserUserModel();
  }

  constructor(private loginService: UserServiceService, private router: Router,
    private allert: AllertService) { }

  register(): void {
    this.loginService.register(this.userRegister).subscribe(
      (data: { message: string }) => {
        this.allert.showSuccess(data.message, 2000);
        this.router.navigate(['dashboard']);
      },
      (error: { message: string }) => {
        console.error(this.userRegister);
        this.allert.showError("Registration was not successful", 2000);
      }
    );
  }

}
