import { Component } from '@angular/core';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.guard';
import { User } from 'src/app/model/User';
import { UserUserModel } from 'src/app/model/user-model';
import { AllertService } from 'src/app/service/dash/allert.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  email!: string;

  user: UserUserModel = new UserUserModel();
  constructor(private UserService: UserServiceService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService
  ) {
   }

  // getUserByEmail(): void {
  //   this.UserService.getUserByEmail().subscribe(
  //     (data: { message: String, result: UserUserModel }) => {
  //       this.user = data.result;
  //       console.log(this.user);
  //     }
  //   );
  // }

  getUserById(): void {
    this.UserService.getUserById().subscribe(
      (data: { message: String, result: UserUserModel }) => {
        this.user = data.result;
        console.log(this.user);
      }
    );
  }

  updateUser(): void {
    if (this.user) {
      this.UserService.updateUser(this.user!, this.authorizedGuardService.getIdFromToken()).subscribe(
        (data: { message: string, result: UserUserModel, errors: string, errorMap: string[] }) => {
          console.log(data.message);
          this.allert.showSuccess(data.message, 2000);
          // this.getUserByEmail();
          this.getUserById();
        },
        (error: { message: string; errorMap: string }) => {
          console.log(error.message);
          this.allert.showError(error.message, 5000);
        }
      );
    }
    
  }

  ngOnInit(): void {
    // this.getUserByEmail();
    this.getUserById();
  }
}
