import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private _authService: AuthService, private _toastr: ToastrService, private _router: Router) {
    this.loginForm = new FormGroup({
			emailAddress: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {

  }

  public onRegisterClick(){
    this._router.navigateByUrl('register');
  }


  public async onSubmitLoginForm() {
    
    if(this.loginForm.valid){
			try {

				let loginResponse = await this._authService.login(this.loginForm.value['emailAddress'], this.loginForm.value['password']);
				
				if (loginResponse.success) {				
					this._authService.setIdTokenProps(loginResponse.idToken);
          this._router.navigateByUrl('search');
				}
				else {
					this._toastr.error(loginResponse.errorMessage, 'Unable to Sign In');
				}
			} catch (e) {
				this._toastr.error(e, 'Unable to Sign In');
			}

		}
  }

}
