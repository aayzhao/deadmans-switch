import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'mongodb+srv://admin:hfuyfrGd5rOT95Qg@cluster0.9shfq.mongodb.net/deadmans-switch?retryWrites=true&w=majority&appName=Cluster0';

  constructor(private http: HttpClient) {}

  register(userData: { username: string; password: string; email: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, userData, { headers });
  }

  login(userData: { username: string; password: string}): Observable<any> {
    const headers = new HttpHeaders({ 'Content_type': 'application/json' });
    return this.http.post<any>(this.apiUrl, userData, {headers})
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({ 'Content_type': 'application/json' });
    return this.http.post<any>(this.apiUrl, {headers})
  }
}