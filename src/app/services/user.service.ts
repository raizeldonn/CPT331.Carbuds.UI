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
import { PostVerifyUserRequest } from '../contracts/user/post.verifyUser.request.model';
import { PostVerifyUserResponse } from '../contracts/user/post.verifyUser.response.model';

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

  public async selfServeSignupUser(request: PostCreateCognitoUserRequest): Promise<PostCreateCognitoUserResponse>{
    
    let response = await this._http.post<PostCreateCognitoUserResponse>(`${environment.apiBaseUrl}/api/users/usersignup`, request).toPromise();
    return response;
  }

  public async verifyUser(request: PostVerifyUserRequest): Promise<PostVerifyUserResponse>{
    
    let response = await this._http.post<PostVerifyUserResponse>(`${environment.apiBaseUrl}/api/users/verify`, request).toPromise();
    return response;
  }

  public async getUser(email: string): Promise<GetUserResponse>{

    let response = await this._http.get<GetUserResponse>( `${environment.apiBaseUrl}/api/users/${email}`).toPromise();
    return response;
  }

  
}
