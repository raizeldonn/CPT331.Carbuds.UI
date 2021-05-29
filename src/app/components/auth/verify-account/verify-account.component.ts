import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostVerifyUserRequest } from 'src/app/contracts/user/post.verifyUser.request.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  public verifyAccountForm: FormGroup;
  private emailAddress: string = '';

  constructor(private route: ActivatedRoute, private _router: Router, private _toastr: ToastrService, private _userService: UserService) {
    this.verifyAccountForm = new FormGroup({
      verificationCode: new FormControl('', Validators.required)
    });

    this.route.queryParams.subscribe(p => {
      if(p['email']){
        this.emailAddress = p['email'];
      }else{
        this._toastr.error('Sorry, the link you were provided did not contain a valid email address. Please contact us for further support.', 'Error verifying email address');
        this._router.navigateByUrl('login');
      }
    });
   }

  ngOnInit(): void {

  }

  public async onVerificationFormSubmit(){
    if(this.verifyAccountForm.valid){
      
      const verificationRequest: PostVerifyUserRequest = {
        email : this.emailAddress,
        verificationCode: this.verifyAccountForm.value['verificationCode']
      }

      const apiResp = await this._userService.verifyUser(verificationRequest);
      
      if(apiResp.success){
        this._toastr.success('You may now login to Carbuds', 'Account Verified Succesfully');
        this._router.navigateByUrl('login');
      }
      else{
        this._toastr.error(apiResp.errorMessage, 'Error Verifying Your Account');
      }
    }
  }

}
