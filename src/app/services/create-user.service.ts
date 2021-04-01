import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { IdTokenProps } from '../models/auth/idTokenProps.model';
import * as moment from 'moment';
import { PostCreateUserResponse } from '../contracts/auth/post.createuser.response.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { PostCreateUserRequest } from '../contracts/auth/post.createuser.request.model';
import { Navlink } from '../models/common/navlink.model';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private _http: HttpClient, private _router: Router, private _toastr: ToastrService) { }

  public async createUser(username: string, password: string, displayName: string, email: string): Promise<PostCreateUserResponse>{
    
    let request: PostCreateUserRequest = {
      username: username,
      password: password,
      email: email,
      displayName: displayName
      
    }
    let response = await this._http.post<PostCreateUserResponse>(`${environment.apiBaseUrl}/api/signup/signup`, request).toPromise();
    return response;
  }
}
