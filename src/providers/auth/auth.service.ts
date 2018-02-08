import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

//import { auth } from 'firebase';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';

import { BaseService } from '../base.service';

@Injectable()
export class AuthService extends BaseService{

  constructor(
    public auth: AngularFireAuth,
  ) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user)
    .catch(this.handlePromiseError);
  }

  signinWithEmail(user: {email: string, password: string}): firebase.Promise<boolean> {
    return this.auth.login(user)
      .then( (authstate : FirebaseAuthState ) => {
        return authstate != null;
      } )
      .catch(this.handlePromiseError);
  }

  logout() : Promise<void>{
    console.log('deslogando...');
    
    return this.auth.logout();
  }

  get autenticated(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.auth
        //.first()
        .subscribe((authState : FirebaseAuthState) => {
          (authState) ? resolve(true) : reject(false)
        });
    });
  }
}
