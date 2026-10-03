import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    console.log('clicked');
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: () => {
        alert('Invalid credentials');
      }
    });
  }
}
