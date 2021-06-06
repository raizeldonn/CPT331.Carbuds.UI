import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {User} from 'src/app/models/user/user.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdatePasswordComponent } from '../../auth/updatePassword/updatePassword.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public userRecord?: User;
  public userActive: boolean = false;

  constructor(private _userService: UserService, public _activeModal: NgbActiveModal, private _toastr:ToastrService, private _modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.userRecord != undefined){
      this.getSingleUser(this.userRecord.email);
    }
    else{
      console.log('empy user');
    }
  }

  public async getSingleUser(email: string){
    let userResponse = await this._userService.getUser(email);
    this.userActive = userResponse.userActive;
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

  public async onEnableDisableUserClick(){
    const userNewState = !this.userActive;    
    const updateComplete = await this._userService.updateAccountStatus(this.userRecord?.email ? this.userRecord?.email : '', userNewState);
    const updateMessage = userNewState ? 'User Account Reactivated' : 'User Account Disabled';
    
    if(updateComplete.success){
      this._toastr.success('', updateMessage);
      this.userActive = userNewState;
    }
    else{
      this._toastr.error(updateComplete.errorMessage, 'Error updating User Account Status');
    }
  }

  public onResetPasswordClick() {
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(UpdatePasswordComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.userEmail = this.userRecord!.email;
  }

}
