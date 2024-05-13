import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signupForm = this.fb.group({
        userName: ['', [Validators.pattern(/^[А-Я][а-яА-Я]{3,}(?: [А-Я][а-яА-Я]*){0,2}$/gm), Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
        agree: [false, Validators.requiredTrue],
    });

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private _snackBar: MatSnackBar,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    signUp() {
        if (this.signupForm.valid && this.signupForm.value.userName
            && this.signupForm.value.email && this.signupForm.value.password) {
            this.authService.signup(this.signupForm.value.userName, this.signupForm.value.email, this.signupForm.value.password)
                .subscribe({
                        next: (value: DefaultResponseType | LoginResponseType) => {
                            let error = null;
                            if ((value as DefaultResponseType).error !== undefined) {
                                error = (value as DefaultResponseType).message;
                            }

                            const loginResponse = value as LoginResponseType;
                            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
                                error = 'Ошибка регистрации';
                            }

                            if (error) {
                                this._snackBar.open(error);
                                throw new Error(error);
                            }

                            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
                            this.authService.userId = loginResponse.userId;
                            this._snackBar.open('Вы успешно зарегистрировались!');
                            this.router.navigate(['/']);
                        },
                        error: (err: HttpErrorResponse) => {
                            if (err.error && err.error.message) {
                                this._snackBar.open(err.error.message);
                            } else {
                                this._snackBar.open('Ошибка регистрации');
                            }
                        }
                    }
                )
        }
    }
}
