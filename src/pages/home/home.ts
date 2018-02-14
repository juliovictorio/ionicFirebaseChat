import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../../providers/auth/auth.service';
import { SignupPage } from '../signup/signup';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user/user.service';
import { Promise } from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  view : string = 'chats';

  constructor(
    public authService : AuthService,
    public navCtrl: NavController,
    public userService: UserService
  ) {

  }

  ionViewCanEnter() : Promise<boolean>{
    return this.authService.autenticated
  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onChatCreate(user: User): void {
    console.log(user);  
  }
  onSignup(): void{
    this.navCtrl.push(SignupPage)
  }
}
