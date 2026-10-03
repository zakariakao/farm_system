import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-component',
  imports: [FormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent implements OnInit {

  users: User[] = [];
  userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  isWarning: boolean = false;
  warningContent: string = '';
  isSucces: boolean = false;
  succesContent: string = '';
  isError: boolean = false;
  errorContent: string = '';

  newUser = {
    username: '',
    email: '',
    password: '',
    role: ''
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (userss) => {
        this.users = userss;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading users:', error);
        if (error && error.error) {
          console.error('Backend error object:', error.error);
        }
        this.errorContent = 'Failed to load users';
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
          this.cdr.detectChanges();
        }, 3000);
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        console.log("user deleted: ", response);
        this.loadUsers();
      },
      error: (error) => {
        console.log("Erreur deleting:", error);
      }
    })
  }

  addUser() {
    // Client-side validation
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password || !this.newUser.role) {
      this.warningContent = 'Please fill all the fields';
      this.isWarning = true;
      setTimeout(() => {
        this.isWarning = false;
        this.cdr.detectChanges();
      }, 3000);
      return;
    }

    // Password length validation
    if (this.newUser.password.length < 6) {
      this.warningContent = 'Password must be at least 6 characters';
      this.isWarning = true;
      setTimeout(() => {
        this.isWarning = false;
        this.cdr.detectChanges();
      }, 3000);
      return;
    }

    this.userService.createUser(this.newUser as User).subscribe({
      next: (response) => {
        this.succesContent = 'User created successfully';
        this.isSucces = true;
        setTimeout(() => {
          this.isSucces = false;
          this.cdr.detectChanges();
        }, 3000);
        this.resetForm();
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error creating user:', error);
        if (error && error.error) {
          console.error('Backend error object:', error.error);
        }
        if (error.status === 400) {
          this.errorContent = 'The username or email already exists';
          this.isError = true;
        } else if (error.status === 500) {
          this.errorContent = 'Server error. Please try again later';
          this.isError = true;
        } else {
          this.errorContent = 'Failed to create user. Please try again';
          this.isError = true;
        }
        setTimeout(() => {
          this.isError = false;
          this.cdr.detectChanges();
        }, 3000);
      }
    });
  }

  resetForm() {
    this.newUser = {
      username: '',
      email: '',
      password: '',
      role: ''
    };
  }
}