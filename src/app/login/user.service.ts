import { Injectable } from '@angular/core';
import {User} from "../model/user";

@Injectable()
export class UserService {

  static users: Set<User> = new Set<User>();

  constructor() { }

  getUsers(): Set<User> {

    if(UserService.users.size > 0)
      return UserService.users;

    UserService.users.add(new User('10645c4a-cc25-11e7-acdc-96395d26a8d8', 'Michael', 'Jordan',
      9483336, new Date(1976, 10, 10), 'mjordan', '', ''));
    UserService.users.add(new User('36ce3c3e-cc25-11e7-acdc-96395d26a8d8', 'Lebron', 'James',
      9487026, new Date(1976, 10, 15), 'ljames', '', ''));
    UserService.users.add(new User('77888298-cc25-11e7-acdc-96395d26a8d8', 'Trisha', 'Yearwood',
      111111, new Date(1976, 10, 20), 'tyearwood', '', ''));

    return UserService.users;

  }



}
