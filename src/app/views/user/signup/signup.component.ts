import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  signUp() {
    alert(1);
  }
}
