import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/first'

import { FirebaseAuthState } from 'angularfire2/auth';

import { AuthService } from './../../providers/auth/auth.service';
import { HomePage } from '../home/home';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user/user.service';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  sigupForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadinCOntroler: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {

    //o ".group" recebe como parametro os campos do nosso formulário
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.sigupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading()
    let formUser = this.sigupForm.value;
    let username: string = formUser.username;

    this.userService.userExists(username)
      .first()  //observamos apenas o primeiro
      //.take(1)//observamos a quantidade de vezes que foi passado como parâmetro
      .subscribe((userExists: boolean) => {

        if (!userExists) {

          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authstate: FirebaseAuthState) => {

            delete formUser.password; //para não gravar no firebase
            formUser.uid = authstate.auth.uid;

            this.userService.create(formUser)
              .then(() => {
                console.log("Usuario cadastrado com sucesso!!!");
                this.navCtrl.setRoot(HomePage);
                loading.dismiss();
              }).catch((error: any) => {
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              });

          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });


        } else {
          this.showAlert(`O username ${username} já está sendo utilizado em outra conta!`);
          loading.dismiss();
        }

      });

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadinCOntroler.create({
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
