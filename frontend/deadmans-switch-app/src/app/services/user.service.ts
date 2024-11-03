import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserEmail: string = '';
  private apiUrl = 'http://localhost:3000';

  private emailListSubject = new BehaviorSubject<string[]>([]);
  public emailList$ = this.emailListSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCurrentUserEmail(email: string) {
    this.currentUserEmail = email;
  }

  getCurrentUserEmail(): string {
    return this.currentUserEmail;
  }

  refresh(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.apiUrl}/refresh`,
      {},
      {
        headers,
        withCredentials: true,
      }
    );
  }

  addEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email };
    return this.http.post<any>(`${this.apiUrl}/email`, body, {
      headers,
      withCredentials: true,
    });
  }

  deleteEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email };
    return this.http.delete<any>(`${this.apiUrl}/email`, {
      headers,
      withCredentials: true,
      body: body,
    });
  }

  getEmail(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/email`, {
      headers,
      withCredentials: true,
    });
  }

  getText(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/text`, {
      headers,
      withCredentials: true,
    });
  }

  saveText(text: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { text: text };
    return this.http.post<any>(`${this.apiUrl}/text`, body, {
      headers,
      withCredentials: true,
    });
  }
}
