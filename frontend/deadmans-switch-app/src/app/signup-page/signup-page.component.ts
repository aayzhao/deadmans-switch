import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    public loginCreds = this.formBuilder.group({
        username: this.username,
        password: this.password
    })

    constructor(
        protected formBuilder: FormBuilder,
        protected snackbar: MatSnackBar
    ) {}

    onSubmitForm() {
        
    }
}