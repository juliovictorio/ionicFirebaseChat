import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BaseService } from '../base.service';
import { User } from './../../models/user.model';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;

  constructor(
    public af: AngularFire
  ) {
    super();
    console.log('Hello UserProvider Provider');
    this.users = this.af.database.list(`/users`)
  }

  /*create(user: User, uuid: string): firebase.Promise<void> {
    return this.af.database.list(`/users`)
      .push(user);      
  }*/
  create(user: User): firebase.Promise<void> {
    /*return this.af.database.list(`/users`)
      .push(user); */
    return this.af.database.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }
}
