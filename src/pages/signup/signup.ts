import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from './../../providers/user/user.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  sigupForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService  
  ) {

      //o ".group" recebe como parametro os campos do nosso formulário
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.sigupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)] ],
        username:['', [Validators.required, Validators.minLength(3)] ],
        email:['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
        password:['', [Validators.required, Validators.minLength(6)]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  onSubmit(): void{
    //console.log(this.sigupForm.value);
    this.userService.create(this.sigupForm.value)
      .then(() => {
      console.log("Usuario cadastrado com sucesso!!!");
      
    });
  }
}
