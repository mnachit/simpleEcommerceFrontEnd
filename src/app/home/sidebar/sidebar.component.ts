import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.guard';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private token: AuthorizedGuardService) {}
  Role: string = this.token.getRoleFromToken();

  ngOnInit(): void {}

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}
