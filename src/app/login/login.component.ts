import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { loginAnimation, errorAnimation } from './login.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: [loginAnimation, errorAnimation]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  error: string;
  timeout;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });    
  }

  private showError(message){
    this.error = message;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.closeError(), 2000);
  }

  private closeError(){
    this.error = null;
  }

  onSubmit(){
    this.loading = true;
    const redirectUrl = this.authService.redirectUrl;
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        if(data.success){
          this.loginForm.reset();
          this.router.navigate([redirectUrl]);
        } else {  
          this.loginForm.markAsPristine();
          this.showError(data.message);
        }
      },
      error => error,
      () => this.loading = false
    );
  }

}
