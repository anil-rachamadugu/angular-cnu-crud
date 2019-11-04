import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DevtaskService } from 'src/app/services/devtask.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _service: DevtaskService,
    private _toaster: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get v() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  } else if (this.loginForm.valid) {
      this._service.login(this.v.username.value, this.v.password.value).subscribe(
        (res: any) => {
          if (res.length > 0) {
            localStorage.setItem('currentUser', this.v.username.value);
            this._router.navigate(['posts']);
          } else if (res.length <= 0) {
            this._toaster.error('Enter a valid username and password', 'Error');
            this.loginForm.reset();
          }
        },
        err => {
          if (err.status === 0) {
            this._toaster.error('Json server is not started', 'Ohh sorry');
          }
        });
    }
  }
}


  // onSubmit(user) {
  //   this.submitted = true;
  //   const Username = this.v.username.value;
  //   const Password = this.v.password.value;
  //   // stop here if form is invalid
  //   if (this.loginForm.valid) {
  //     return;
  //   }
  //   this._service.login(Username, Password).subscribe((data: any) => {
  //     if (data.length > 0) {
  //       this._router.navigate(['posts']);
  //     } else if (data.length <= 0) {
  //       this._toaster.error('Enter Valid username and password', 'Error');
  //       this.loginForm.reset();
  //     }
  //   });
  // }