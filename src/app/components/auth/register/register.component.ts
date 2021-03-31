import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private _authService: AuthService, private _toastr: ToastrService, private _router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
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

  }
}
