import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UsersResponse } from '../users-response';
import { User } from '../users';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UsersResponse;
  page: number;
  perPage: number = 4;
  touchTime: number = 0;

  constructor(private service: UsersService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getUsers().subscribe((data: UsersResponse) => {
      this.users = data;
    })
    console.log(this.service.getUsersLocalStorage(1));
    
  }

  deleteUser(user: User) {
    if (this.touchTime == 0) {
      this.touchTime = new Date().getTime();
    } else {
      if (((new Date().getTime()) - this.touchTime) < 800) {
        this.touchTime = 0;
      } else {
        this.touchTime = new Date().getTime();
      }
    }
  }

  changePage() {
    if (this.page <= 0)
      this.page = 1

    if (this.page > this.users.total_pages)
      this.page = this.users.total_pages

    this.service.getUsers(this.page).subscribe((data: UsersResponse) => {
      this.users = data;
    })
  }

}
