import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    public loginCreds = this.formBuilder.group({
        username: this.username,
        password: this.password
    })

    constructor(
        protected formBuilder: FormBuilder,
        protected snackBar: MatSnackBar
    ) {}

    onSubmitForm() {
        if (this.loginCreds.valid) {

        } else {
            this.snackBar.open('Please enter your username/password')
        }
    }
}