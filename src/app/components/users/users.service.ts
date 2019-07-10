import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersResponse } from './users-response';
import { URL_API } from 'src/app/api';
import { User } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(page: number = 0, perPage: number = 4) {
    if (page == 0)
      return this.http.get<UsersResponse>(URL_API + 'users?page=1&per_page=4')
    else
      return this.http.get<UsersResponse>(URL_API + 'users?page=' + page + '&per_page=' + perPage)

  }

  getUser(id: number) {
    return this.http.get<UsersResponse>(URL_API + id)
  }

  getUsersLocalStorage(page: number) {    
    var itemsLocalStorage = [];    

    for (let index = 1; index <= localStorage.length; index++) {      
      let key = (localStorage.length - index).toString();
      itemsLocalStorage.push(localStorage.getItem(key));      
    }

    let minResult = (page - 1) * 2;
    let maxResult = page * 2;
    let totalPages = itemsLocalStorage.length / maxResult;
    console.log(totalPages);
    
    return itemsLocalStorage.slice(minResult, maxResult);
  }

  getUserLocalStorage(id: any) {
    return localStorage.getItem(id);
  }

  saveUserLocalStorage(user: User, key: string = '') {
    if (key != '')
      localStorage.setItem(key, JSON.stringify(user))
    else
      localStorage.setItem(localStorage.length.toString(), JSON.stringify(user))
  }

  deleteUserLocalStorage(id: any) {
    localStorage.removeItem(id)
  }
}
