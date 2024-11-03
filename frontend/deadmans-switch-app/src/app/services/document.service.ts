import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getDocuments(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents?email=${userEmail}`, {
      withCredentials: true,
    });
  }

  uploadDocument(file: File, userEmail: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', userEmail);

    return this.http.post(`${this.apiUrl}/documents/upload`, formData, {
      withCredentials: true,
    });
  }
}
