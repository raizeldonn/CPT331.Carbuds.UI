import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUserService } from 'src/app/services/create-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private _createUserService: CreateUserService, private _toastr: ToastrService, private _router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
			emailAddress: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {
  }

  public onLoginClick(){
    this._router.navigateByUrl('login');
  }

  public async onSubmitRegisterForm() {
    try {

      this._createUserService.createUser("testusername","testusername","testuser","testuser@barbuds.io");
      return true
      //let signupResponce = this._createUserService.createUser[(this.registerForm.value['username'], this.registerForm.value['password'], this.registerForm.value['firstName'], this.registerForm.value['emailAddress']);
      //if (signupResponce)
      //{
      //  return true
      //}
      //return false

    } catch (e) {
      this._toastr.error(e, 'Unable to Sign In');
      return false
    }
  }
}
