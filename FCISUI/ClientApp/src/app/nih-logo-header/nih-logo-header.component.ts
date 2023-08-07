import { Component } from '@angular/core';
import { UserService } from '../shared/auth/user.service';

@Component({
  selector: 'app-nih-logo-header',
  templateUrl: './nih-logo-header.component.html',
  styleUrls: ['./nih-logo-header.component.scss']
})
export class NihLogoHeaderComponent {
  userName = ''
  constructor(public userService:UserService) {
    userService.currentUser$.subscribe(user=> {
      this.userName = user.firstname;
    })
  }
}
