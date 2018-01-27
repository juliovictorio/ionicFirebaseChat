import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from './../../models/user.model';

@Injectable()
export class UserService {

  constructor(
    public af: AngularFire
  ) {
    console.log('Hello UserProvider Provider');
  }

  create(user: User, uuid: string): firebase.Promise<void> {
    return this.af.database.list(`/users`)
      .push(user);      
  }
}
