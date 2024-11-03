import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Add this
import { MatButtonModule } from '@angular/material/button';  // Add this
import { MatIconModule } from '@angular/material/icon';  // Add this
import { MatCardModule } from '@angular/material/card';  // Add this
import { MatListModule } from '@angular/material/list';  // Add this
import { UserService } from '../services/user.service';
import { DocumentService } from '../services/document.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  size: string;
}

@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.css'
})
export class FileManagementComponent implements OnInit {
  userEmail: string = '';
  documents: Document[] = [];
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private documentService: DocumentService,
    protected snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.userEmail = this.userService.getCurrentUserEmail();
    // this.loadDocuments();
  }

  loadDocuments() {
    this.loading = true;
    this.documentService.getDocuments(this.userEmail).subscribe({
      next: (docs) => {
        this.documents = docs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading documents:', error);
        this.loading = false;
      }
    });
  }
  
  uploadFile(file: File) {
    this.documentService.uploadDocument(file, this.userEmail).subscribe({
      next: (response) => {
        console.log('File uploaded successfully');
        this.loadDocuments(); // Refresh the document list
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.uploadFile(file);
    }
  }

  refresh() {
    this.userService.refresh().subscribe({
      next: (response) => {
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          // Handle successful login, e.g., redirect
      },
      error: (error) => {
          this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
          // Handle login failure
      }
  });
  }
}