import { Component, OnInit } from '@angular/core';import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-user-admin-overview',
  templateUrl: './user-admin-overview.component.html',
  styleUrls: ['./user-admin-overview.component.scss']
})
export class UserAdminOverviewComponent implements OnInit {

  public users: User[] = [];

  constructor(private _userService: UserService, private _toastr: ToastrService, private _modalService: NgbModal, private _utils: UtilityService) { }

  ngOnInit(): void {
    this.getUserData()
  }

  public async getUserData(){
    try {

      let addUserResponse = await this._userService.listAllUsers();
      if (addUserResponse.success) {
        this.users = addUserResponse.users.sort(this._utils.dynamicSort('name'));
      }
      else {
        this._toastr.error(addUserResponse.errorMessage, 'Unable to Get List Of Users');
      }
    } catch (e) {
      this._toastr.error(e, 'Unable to Get List Of Users');
    }
  }

}
