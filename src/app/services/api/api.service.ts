import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  DELIVERY_SERVICE_URI = 'http://localhost:8000/api';

  fetchUser(): Observable<any> {
    return this.http.get<any>(`${this.DELIVERY_SERVICE_URI}/user`, {
      withCredentials: true,
    });
  }
}
