import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    email = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    public loginCreds = this.formBuilder.group({
        email: this.email,
        password: this.password
    })

    constructor(
        protected formBuilder: FormBuilder,
        protected snackBar: MatSnackBar,
        public auth: AuthenticationService,
        private router: Router,
        private user: UserService
    ) {}

    onSubmitForm() {
        if (this.loginCreds.valid) {
            const userData = {
                email: this.loginCreds.get('email')!.value as string,
                password: this.loginCreds.get('password')!.value as string
            };
    
            this.auth.login(userData).subscribe({
                next: (response) => {
                    this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
                    this.user.setCurrentUserEmail(userData.email);
                    this.router.navigate(['/manage']);
                    // Handle successful login, e.g., redirect
                },
                error: (error) => {
                    this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
                    // Handle login failure
                }
            });
        } else {
            this.snackBar.open('Please enter your email/password', 'Close', { duration: 3000 });
        }
    }
}