import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { IdTokenProps } from '../models/auth/idTokenProps.model';
import moment from 'moment';
import { PostLoginResponse } from '../contracts/auth/post.login.response.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { PostLoginRequest } from '../contracts/auth/post.login.request.model';
import { Navlink } from '../models/common/navlink.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private idToken: string = '';
  public idTokenProps?: IdTokenProps;
  public amLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public visibleNavlinks: BehaviorSubject<Navlink[]> = new BehaviorSubject<Navlink[]>([]);

  private navLinks: Navlink[] = [
    {
      title: 'Manage Vehicles',
      path: 'admin/vehicles',
      faIcon: 'fas fa-car',
      requiredPermission: 'carbuds-admins'
    },
    {
      title: 'Manage Parking Locations',
      path: 'admin/parkingLocations',
      faIcon: 'fas fa-parking',
      requiredPermission: 'carbuds-admins'
    },
    {
      title: 'Search Vehicles',
      path: 'search',
      faIcon: 'fas fa-search',
      requiredPermission: null
    },
    {
      title: 'My Profile',
      path: 'profile',
      faIcon: 'fas fa-user',
      requiredPermission: 'carbuds-users'
    },
    {
      title: 'View Bookings',
      path: 'user/view-bookings',
      faIcon: 'far fa-calendar-check',
      requiredPermission: 'carbuds-users'
    }
  ]; 

  constructor(private _http: HttpClient, private _router: Router, private _toastr: ToastrService) {

    if(localStorage.getItem('idToken')){
      this.idToken = localStorage.getItem('idToken') ?? '';
      this.setIdTokenProps(this.idToken);      
    };
  } 

  public async login(username: string, password: string): Promise<PostLoginResponse>{
    
    let request: PostLoginRequest = {
      username: username,
      password: password,
      clientId: environment.cognitoClientId
    }

    let response = await this._http.post<PostLoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, request).toPromise();    
    return response;
  }

  public logOut(){
    this.idToken  = '';
    this.idTokenProps = undefined;
    
    localStorage.removeItem('idToken');
    this.visibleNavlinks.next(this.updateMyNavLinks());

    this.amLoggedIn.next(false);
  }

  public tokenExpired(): boolean {
    let tokenExp = moment.utc(moment.unix(this.idTokenProps? this.idTokenProps.tokenExpiry : 0));
    if(moment().utc().isAfter(tokenExp)){
      return true;
    }
    return false;
  }

  public setIdTokenProps(token: string){
    
    let tokenDecoded: any = jwt_decode(token);
    
    this.idTokenProps = {
      userId: tokenDecoded['sub'],
      username : tokenDecoded['cognito:username'],
      displayName : tokenDecoded['given_name'],
      cognitoGroups: tokenDecoded['cognito:groups'] ?? [],
      tokenExpiry: tokenDecoded['exp'],
      email: tokenDecoded['email']
    };

    this.idToken = token;
    localStorage.setItem('idToken', this.idToken);

    if(!this.tokenExpired()){
      this.amLoggedIn.next(true); 
      this.visibleNavlinks.next(this.updateMyNavLinks());
    }
    else{
      this._toastr.error('Your access token has expired, please sign in again', 'Access Expired');
      this.logOut();
      this._router.navigateByUrl('login');   
    }
  }  

  private updateMyNavLinks(): Navlink[]{    
    let myNavLinks: Navlink[] = [];

    for(let link of this.navLinks){
      if(this.canIAccesslink(link)){
        myNavLinks.push(link);
      }
    }

    return myNavLinks;
  }

  private canIAccesslink(link: Navlink): boolean {
    if(!this.idToken){
      return false;
    }
    
    if(!link.requiredPermission){
      return true;
    }    

    let permission = link.requiredPermission ?? '';
    if(this.idTokenProps && this.idTokenProps.cognitoGroups.find(p => p.toLowerCase() == permission.toLowerCase())) {
      return true;
    }   

    return false;
  }

  public generateAuthHeader(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.idToken
    });
  }

}
