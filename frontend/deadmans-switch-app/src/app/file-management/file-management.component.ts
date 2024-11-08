import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  // Add this
import { MatButtonModule } from '@angular/material/button';  // Add this
import { MatIconModule } from '@angular/material/icon';  // Add this
import { MatCardModule } from '@angular/material/card';  // Add this
import { MatListModule } from '@angular/material/list';  // Add this
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.css'
})
export class FileManagementComponent implements OnInit {
  userEmail: string = '';
  documentText: string = '';
  saving: boolean = false;
  lastSaved: Date | null = null;
  @ViewChild('textArea') textArea!: ElementRef;

  emails: string[] = [];
  newEmail: string = '';
  emailError: boolean = false;

  constructor(
    private userService: UserService,
    protected snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.userEmail = this.userService.getCurrentUserEmail();

    this.userService.emailList$.subscribe(emails => {
      this.emails = emails;
    });
    this.loadEmail();
    this.loadText();
  }

  loadText() {
    // Assuming you have a getText method in your service
    this.userService.getText().subscribe({
      next: (response) => {
        this.documentText = response[0].text || '';
      },
      error: (error) => {
        console.error('Error loading text:', error);
      }
    });
  }

  saveText() {
    if (!this.saving) {
      this.saving = true;
      
      // Assuming you have a saveText method in your service
      this.userService.saveText(this.documentText).subscribe({
        next: () => {
          this.lastSaved = new Date();
          this.saving = false;
        },
        error: (error) => {
          console.error('Error saving text:', error);
          this.saving = false;
        }
      });
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

  addEmail() {
    if (this.isValidEmail(this.newEmail) && !this.emails.includes(this.newEmail)) {
      this.userService.addEmail(this.newEmail).subscribe({
        next: (response) => {
          // Only load emails after successful add
          this.loadEmail();
          this.newEmail = ''; // Clear input after success
          this.emailError = false;
          this.snackBar.open('Added email!', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Email failed. Please try again.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.emailError = true;
    }
  }

  removeEmail(email: string) {
    if (this.isValidEmail(email) && this.emails.includes(email)) {
      this.userService.deleteEmail(email).subscribe({
        next: (response) => {
          this.snackBar.open('Deleted email!', 'Close', { duration: 3000 });
          this.loadEmail();
          this.emailError = false;
        },
        error: (error) => {
            this.snackBar.open('Deletion failed. Please try again.', 'Close', { duration: 3000 });
        }
      });
      
      
    } else {
      this.emailError = true;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  loadEmail() {
    this.userService.getEmail().subscribe({
      next: (response) => {
        this.emails = response[0].emails || [];  // Use empty array if undefined
        console.log(this.emails.length);
      },
      error: (error) => {
        console.error('Error fetching emails:', error);
        this.snackBar.open('Error loading emails', 'Close', { duration: 3000 });
      }
    });
  }
}