import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  constructor(private loginService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

}
