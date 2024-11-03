import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserEmail: string = '';

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  setCurrentUserEmail(email: string) {
    this.currentUserEmail = email;
  }

  getCurrentUserEmail(): string {
    return this.currentUserEmail;
  }

  refresh(): Observable<any> {
    const headers = new HttpHeaders({ 'Content_type': 'application/json' });
    return this.http.post<any>(this.apiUrl+'/refresh', {headers})
  }
}