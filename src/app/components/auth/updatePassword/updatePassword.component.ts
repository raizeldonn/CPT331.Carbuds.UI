import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateResetUserPasswordRequest } from 'src/app/contracts/user/update.reset.user.password.request.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updatePassword',
  templateUrl: './updatePassword.component.html',
  styleUrls: ['./updatePassword.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  public updatePasswordForm: FormGroup;
  public userEmail!: string;

  constructor(private _authService: AuthService, private _toastr: ToastrService, private _router: Router, public _activeModal: NgbActiveModal, private _modalService: NgbModal, private _userService: UserService) {
    this.updatePasswordForm = new FormGroup({
			password: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {

  }

  public onCancelClick() {
    this._activeModal.dismiss(null);
  }


  public async onSubmitUpdatePasswordForm() {
    
    if(this.updatePasswordForm.valid){

			try {

				let  UpdateUserPasswordResponse = await this._userService.updatePassword(this.userEmail, this.updatePasswordForm.value['password']);
				
				if (UpdateUserPasswordResponse.success) {			
          this._toastr.success("Password set");
          this._activeModal.dismiss(null);
				}
				else {
					this._toastr.error(UpdateUserPasswordResponse.errorMessage, 'Unable to update password');
				}
			} catch (e) {
				this._toastr.error(e, 'Unable to update password');
			}
  }
  }

}
