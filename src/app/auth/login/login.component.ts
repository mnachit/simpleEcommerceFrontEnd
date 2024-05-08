import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUserModel } from 'src/app/model/user-model';
import { AllertService } from 'src/app/service/dash/allert.service';
import { UserServiceService } from 'src/app/service/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userlogin!: UserUserModel;

  ngOnInit(): void {
    this.userlogin = new UserUserModel();
  }

  constructor(private loginService: UserServiceService, private router: Router, private allert: AllertService) { }

  login(): void {
    this.loginService.login(this.userlogin!).subscribe(
      (data: { message: string }) => {
        this.allert.showSuccess(data.message, 2000);
        this.router.navigate(['home']);
        console.log(data);
      },
      (error: { message: string }) => {
        console.error(error.message);
        this.allert.showError("",2000);
      }
    );
  }

}
