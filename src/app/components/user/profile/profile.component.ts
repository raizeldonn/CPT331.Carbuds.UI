import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //dont know if this is correct thing to do
  //did it for now to get error to go away
  // how to fix??
  public user!: User;

  constructor(private _authService: AuthService, private _userService: UserService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  public async getUserData(){
    try {

      let userResponse = await this._userService.getUser(this._authService.idTokenProps?.email!);
      if (userResponse.success) {
        this.user = userResponse.user;
      }
      else {
        this._toastr.error(userResponse.errorMessage, 'Unable to Get User');
      }
    } catch (e) {
      this._toastr.error(e, 'Unable to Get User');
    }
  }

  public async updateProfile(){
    
  }

}
