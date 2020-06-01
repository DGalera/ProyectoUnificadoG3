import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginPage } from './login/login.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './core/AuthService';
import { UserInterface } from './share/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  darkMode: boolean;
  darkModeOption: boolean;
  currentUser: string = '';

  isLogged: boolean = false;
  user: UserInterface = {
    name: '',
    email: '',
    password: ''
  }

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkTheme();
    });

    this.platform.resume.subscribe(() => {
      this.authService.logoutUser();
      
    });
  }


  ngAfterViewInit() {
    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.logOut();
  }

  // Comprueba si el tema está en modo oscuro
  checkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefersDark);
    if (prefersDark.matches){   
      this.darkMode = true;
      this.darkModeOption = false;
      document.body.classList.toggle('dark');
    } else {
      this.darkMode = false;
      this.darkModeOption = true;
    }
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.getCurrentUser();
    
  }

  // Muestra el modal de login - registro
  async registerTapped(){
    let modal;
    modal = await this.modalController.create({
      component: LoginPage,
    });

    modal.onDidDismiss().then(data =>{
      this.getCurrentUser();
    });
    
    return await modal.present();
  }


  // Cambia de modo oscuro a normal
  changeTheme(){
    this.darkMode = !this.darkMode;
    console.log(this.darkMode);
    document.body.classList.toggle('dark');
    console.log(this.darkMode);
  }

  // Guarda en el registro el usuario que ha iniciado sesión
  private getCurrentUser(){   
    this.authService.isAuth().subscribe(auth => {
      
      if (auth) {
        this.isLogged = true;
        this.currentUser = this.authService.currentUserName;
      } else {
        this.currentUser = 'No loggeado';
        this.isLogged = false;
      }
    });
  }

  // Cierra la sesión
  logOut(){
    this.authService.logoutUser();
  }
  
}
