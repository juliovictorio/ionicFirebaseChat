import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth/auth.service';
import { HomePage } from '../home/home';
import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  siginForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {

      //o ".group" recebe como parametro os campos do nosso formulário
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.siginForm = this.formBuilder.group({
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSubmit(): void {
    const loading: Loading = this.showLoading();
    this.authService.signinWithEmail(this.siginForm.value)
      .then((isLogged : boolean) => {
        if(isLogged){
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
  }

  onSignup(){
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingController.create({
      content: "Carregando..."
    });

    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertController.create({
      message: message,
      buttons: ["ok"]
    }).present();
  }

}
