import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required]);

    public loginCreds = this.formBuilder.group({
        username: this.username,
        password: this.password,
        email: this.email
    })

    constructor(
        protected formBuilder: FormBuilder,
        protected snackbar: MatSnackBar,
        public auth: AuthenticationService,
        private router: Router,
        private user: UserService
    ) {}

    onSubmitForm() {
        if (this.loginCreds.valid) {
            const userData = {
                username: this.loginCreds.get('username')!.value as string,
                password: this.loginCreds.get('password')!.value as string,
                email: this.loginCreds.get('email')!.value as string
            };

            this.auth.register(userData).subscribe({
                next: (response) => {
                    this.snackbar.open('Registration successful!', 'Close', { duration: 3000 });
                    this.user.setCurrentUserEmail(userData.email);
                    this.router.navigate(['/manage']);
                    // Handle successful registration, e.g., redirect
                },
                error: (error) => {
                    this.snackbar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
                    // Handle registration failure
                }
            });
        } else {
            this.snackbar.open('Please fill out all required fields.', 'Close', { duration: 3000 });
        }
    }
}