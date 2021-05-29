import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostCreateCognitoUserRequest } from 'src/app/contracts/user/post.createCognitoUser.request.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private _userService: UserService, private _toastr: ToastrService, private _router: Router) {
    this.registerForm = new FormGroup({
			emailAddress: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      paymentCardNumber: new FormControl('', Validators.required),
      paymentCardExpiry: new FormControl('', Validators.required),
      paymentCardCvv: new FormControl('', Validators.required),
      licenseCountry: new FormControl('', Validators.required),
      licenseNumber: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {
  }

  public onLoginClick(){
    this._router.navigateByUrl('login');
  }

  public async onSubmitRegisterForm() {
    try {

      let request:PostCreateCognitoUserRequest = {
        email: this.registerForm.value['emailAddress'],
        password: this.registerForm.value['password'],
        name: this.registerForm.value['name'],
        cardNumber: this.registerForm.value['paymentCardNumber'],
        cardExpiry: this.registerForm.value['paymentCardExpiry'],
        cardCvv: this.registerForm.value['paymentCardCvv'],
        licenseCountry: this.registerForm.value['licenseCountry'],
        licenseNumber: this.registerForm.value['licenseNumber']
      }
      
      var response = await this._userService.selfServeSignupUser(request);

      if(!response.success){
        this._toastr.error(response.errorMessage, 'Sorry, there was a problem signing you up!');
      }

      if(response.success){
        this._toastr.success('Please check your email for a verification code to confirm your account information.','Signed up Succesfully!');
        this._router.navigateByUrl(`/verifyAccount?email=${this.registerForm.value['emailAddress']}`);
      }


    } catch (e) {
      this._toastr.error(e, 'Unable to Complete Signup Process');      
    }
  }
}
