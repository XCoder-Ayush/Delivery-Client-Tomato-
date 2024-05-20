import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService) {
    this.fetchUser();
  }
  credentials = {
    email: '',
    password: '',
  };
  async fetchUser() {
    try {
      const user = await this.authService.fetchUser();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  onSubmit() {
    console.log(this.credentials);
  }
}
