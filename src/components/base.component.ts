import { App, AlertController, NavController, MenuController } from 'ionic-angular';

import { AuthService } from './../providers/auth/auth.service';
import { OnInit } from '@angular/core';
import { SigninPage } from '../pages/signin/signin';

export abstract class BaseComponent implements OnInit {
    
    protected navCtrl: NavController;

    constructor(
        public alertController: AlertController,
        public authService:AuthService,
        public app: App,
        public menuCtrl: MenuController
    ) {
        
    }

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout() : void{
        this.alertController.create({
            message: "Do you want to quit?",
            buttons: [
                {
                    text:"Yes",
                    handler: () => {
                        this.authService.logout()
                            .then(() => {
                                this.navCtrl.setRoot(SigninPage);
                            });
                    }
                },
                {
                    text: "No"
                }
            ]
        }).present();
    }
}