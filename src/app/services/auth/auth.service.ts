import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  async fetchUser() {
    try {
      const user = await lastValueFrom(this.apiService.fetchUser());
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
