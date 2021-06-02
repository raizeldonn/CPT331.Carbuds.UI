import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {User} from 'src/app/models/user/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public userRecord?: User;
  public userStatus?: boolean;

  constructor(private _userService: UserService, public _activeModal: NgbActiveModal) { }

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
    this.userStatus = userResponse.userActive;
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

}
