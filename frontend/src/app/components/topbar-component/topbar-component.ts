import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-topbar-component',
  imports: [],
  templateUrl: './topbar-component.html',
  styleUrl: './topbar-component.css',
})
export class TopbarComponent {
  constructor(private authService: AuthService) {
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }
}
