import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logIn(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password ) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.remember)
        .subscribe({
          next: (value: DefaultResponseType | LoginResponseType) => {
            let error = null;
            if ((value as DefaultResponseType).error !== undefined) {
              error = (value as DefaultResponseType).message;
            }

            const loginResponse = value as LoginResponseType;
            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
              error = 'Ошибка авторизации';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
            this.authService.userId = loginResponse.userId;
            this._snackBar.open('Вы успешно авторизовались!');
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            if (err.error && err.error.message) {
              this._snackBar.open(err.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации');
            }
          }
        });
    }
  }
}
