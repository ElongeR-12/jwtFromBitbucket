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

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials);
  }

  //Helper Methods

  setToken(token: string) {// receive a single parameter token
    localStorage.setItem('token', token);
  }

  deleteToken() {//to delet token from local storage
    localStorage.removeItem('token');
  }

  getUserPayload() {// to achieve user information from payload
    var token = localStorage.getItem('token');
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
