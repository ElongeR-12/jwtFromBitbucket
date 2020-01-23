import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {// declare a use of model object which is initialized
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };// property noauth in the header, to add to the request which does not need authentication

  constructor(private http: HttpClient) { }
// HttpMethods
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);// not need JWT in the header
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);// not need JWT in the header
  }

  getUserProfile() {//to access to user profile// send JWT as part of the request header
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  //Helper Methods

  setToken(token: string) {// receive a single parameter token
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  } 

  deleteToken() {//to delet token from local storage
    localStorage.removeItem('token');
  }

  getUserPayload() {// to achieve user information from payload
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {//to verify whether a user is logged in or not
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;// if exp time is over it return false if not JSON of user payload information
    else
      return false;
  }
}
