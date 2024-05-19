import { Component } from '@angular/core';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.guard';
import { UserRole } from 'src/app/model/UserRole';
import { UserUserModel } from 'src/app/model/user-model';
import { AllertService } from 'src/app/service/dash/allert.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent {
  users!: UserUserModel[];
  user!: UserRole;
  constructor(private UserService: UserServiceService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService
  ) {
  }

  ngOnInit(): void {
    this.user = { email: '', roleUser: '' };
    this.getAllUser();
  }

  getAllUser(): void{
    this.UserService.getAllUsers(this.authorizedGuardService.getIdFromToken()).subscribe(
      (data: { message: String, result: UserUserModel[] }) => {
        this.users = data.result;
        console.log(this.users);
      }
    );
  }

  onSelectChange(event: Event, email: string): void {
    const selectElement = event.target as HTMLSelectElement;
    // this.onRoleChange(selectElement.value);
    this.updateRoleUser(email, selectElement.value);
  }

  updateRoleUser(email: string, role: string):void
  {
    this.user.email = email;
    this.user.roleUser = role;
    this.UserService.updateRoleUser(this.user, this.authorizedGuardService.getIdFromToken()).subscribe(
      (data: { message: string }) => {
        this.getAllUser();
        this.allert.showSuccess(data.message, 2000)
        console.log(this.user);
        
      },
      (error: { message: string }) => {
        console.log(error.message);
        this.allert.showError(error.message, 5000);
      }
    );
    
  }

}
