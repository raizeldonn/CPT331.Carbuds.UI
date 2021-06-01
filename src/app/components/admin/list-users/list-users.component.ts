import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public users: User[] = [];

  constructor(private _userService: UserService, private _toastr:ToastrService) { 
    this.initData();
  }

  private async initData(){
    const userDataResp = await this._userService.listUsers();
    if(userDataResp.success){
      this.users = userDataResp.users;
    }
    else{
      this._toastr.error(userDataResp.errorMessage, 'Error getting list of users');
    }
  }

  ngOnInit(): void {
  }

}
