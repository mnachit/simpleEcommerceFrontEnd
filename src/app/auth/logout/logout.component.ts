import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  constructor(private loginService: UserServiceService) { }

  ngOnInit(): void {
    this.loginService.logout();
  }

}
