import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserInfoResponseType} from "../../../../types/user-info-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {
    this.isLogged = this.authService.getIsLogged();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;

      if (isLoggedIn) {
        this.updateUserName();
      }
    });

    if (this.isLogged) {
      this.updateUserName();
    }
  }

  logout() {
    this.authService.logout()
        .subscribe({
          next: () => {
            this.doLogOut();
          },
          error: () => {
            this.doLogOut();
          }
        })
  }

  doLogOut(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']).then();
  }

  updateUserName() {
    this.authService.getUserInfo()
        .subscribe({
          next: (value: DefaultResponseType | UserInfoResponseType) => {
            if ((value as DefaultResponseType).error !== undefined) {
              throw new Error((value as DefaultResponseType).message);
            }

            const fullUserName = (value as UserInfoResponseType).name;

            this.userName = fullUserName.split(' ')[0];
          }
        });
  }
}
