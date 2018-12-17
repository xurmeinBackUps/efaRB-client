import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../models/user';
import {cosmoknotURL} from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `${localStorage.token}`,
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private currentUserSubject: BehaviorSubject<UserData>;
  public currentUser: Observable<UserData>;
  user = new UserData
  id : number;
  is_admin: boolean = false;
  adminID: string

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): UserData {
    return this.currentUserSubject.value;
  }

  register(username, password, is_admin, adminID) {
    return this.http.post<any>(`${cosmoknotURL}/user/register/admin`,{ UserData: username, password, is_admin, adminID } )
    .pipe(map(user => {
      if ( user ) {
        localStorage.setItem('token', user.sessionToken);
        localStorage.setItem('atoken', user.adminToken)
      }
      return user;
    }));
  }
  makeNew()  {
    return this.http.post<any>(`${cosmoknotURL}/user/register/new_user`, httpOptions)
  }
  findAll() : Observable<UserData[]> {
    return this.http.get<UserData[]>(`${cosmoknotURL}/user/sub-users`, httpOptions)
  }
  findOne(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${cosmoknotURL}/user/sub-users/${this.user.id}`, httpOptions)
  }
  deleteUser() {
    return this.http.delete<any>(`${cosmoknotURL}/user/delete_account/${this.user.id}`, httpOptions)
  }
  updateUser() {
    return this.http.put<any>(`${cosmoknotURL}/user/update_account/${this.user.id}`, httpOptions)
  }
}
