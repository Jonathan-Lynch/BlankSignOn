import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmit: FormGroup;

  inputEmail: FormControl = new FormControl('', Validators.email);

  inputPassword: FormControl = new FormControl('', Validators.compose([Validators.maxLength(20), Validators.minLength(4)]));

  validLogin = true;

  get inputPasswordInvalid(): boolean {
    return !this.inputPassword.valid && this.inputPassword.touched;
  }

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.formSubmit = this.formBuilder.group({
      inputEmail: this.inputEmail,
      inputPassword: this.inputPassword
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.formSubmit.value);
    this.validLogin = this.authService.login(this.formSubmit.controls.inputEmail.value,
      this.formSubmit.controls.inputPassword.value);

    if (this.validLogin) {
        this.router.navigate(['/userprofile']);
      }
  }

}
