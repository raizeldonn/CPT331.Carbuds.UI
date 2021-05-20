import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { GetUserResponse } from '../contracts/user/get.user.response.model';
import { PostCreateCognitoUserRequest } from '../contracts/user/post.createCognitoUser.request.model';
import { PostCreateCognitoUserResponse } from '../contracts/user/post.createCognitoUser.response.model';
import { User } from 'src/app/models/user/user.model';
import { IdTokenProps } from '../models/auth/idTokenProps.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private idToken: string = '';
  private tokenDecoded: any;

  constructor(private _http: HttpClient, private _router: Router, private _toastr: ToastrService) { }

  public async createUser(request: PostCreateCognitoUserRequest): Promise<PostCreateCognitoUserResponse>{
    
    let response = await this._http.post<PostCreateCognitoUserResponse>(`${environment.apiBaseUrl}/api/users/signup`, request).toPromise();
    return response;
  }

  public async getUser(): Promise<GetUserResponse>{

    if(localStorage.getItem('idToken')){
      this.idToken = localStorage.getItem('idToken') ?? '';
      this.tokenDecoded = jwt_decode(this.idToken);
    };
    
    let response = await this._http.get<GetUserResponse>( `${environment.apiBaseUrl}/api/users/${this.tokenDecoded['email']}`).toPromise();
    return response;
  }
  
}
