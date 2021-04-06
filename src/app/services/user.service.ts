import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PostCreateCognitoUserRequest } from '../contracts/user/post.createCognitoUser.request.model';
import { PostCreateCognitoUserResponse } from '../contracts/user/post.createCognitoUser.response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _router: Router, private _toastr: ToastrService) { }

  public async createUser(request: PostCreateCognitoUserRequest): Promise<PostCreateCognitoUserResponse>{
    
    let response = await this._http.post<PostCreateCognitoUserResponse>(`${environment.apiBaseUrl}/api/users/signup`, request).toPromise();
    return response;
  }
  
}
