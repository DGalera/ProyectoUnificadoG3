import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AuthService } from '../core/AuthService';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/share/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  success: boolean;
  loginError: string = '';
  // Login fields
  userEmailLogin: string = '';
  userPassLogin: string = '';

  // Register fields
  userName: string = '';
  userEmail: string = '';
  userPass: string = '';

  users: Observable<UserInterface[]>;
  ActualUser: any[];
  currentUser: UserInterface = {
    name: '',
    email: '',
    password: ''
  }

  email: string;


  // Variables que controlan si el usuario se está registrando o quiere iniciar sesión
  registerIsTapped: boolean;
  loginIsTapped: boolean;

  constructor(public modal: ModalController, private authService: AuthService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.registerIsTapped = false;
    this.loginIsTapped = true;
  }

  // Muestra un modal de carga
  showLoading() {
    this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 1000
    }).then((res) => {
      res.present();
    });

  }

  // Cierra el modal de login - registro
  dismissModal() {
    this.modal.dismiss();
  }


  // Guarda en el servicio el usuario que ha iniciado sesión
  getCurrentUser() {
    console.log("==========OnLogin - GetCurrentUser=============");
    this.showLoading();
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.currentUser.email = user.email;
        this.users = this.authService.getUserName(this.currentUser.email).valueChanges();
        this.users.subscribe(data => {
          this.ActualUser = data;
          this.authService.setCurrentUser(this.ActualUser[0].Name);
          console.log(this.ActualUser[0].Name);
          this.dismissModal();
        });
      }
    });




  }

  // Muestra el form de registro
  signUp() {
    this.registerIsTapped = true;
    this.loginIsTapped = false;
  }

  // Comprueba que los datos son correctos a la hora de iniciar sesión
  onLogin(): void {
    this.showLoading();
    this.authService.loginEmailUser(this.userEmailLogin, this.userPassLogin)
      .then((res) => {
        console.log("Logeado correctamente");
        this.authService.isLogged = true;
      }).catch(error => {
      this.loginError = error.message, console.log("Error: ", error); if (this.loginError == '') {
        this.success = true;
        this.getCurrentUser();
      } else {
        this.success = false;
      }
      });
  }

  // Si se registra correctamente se guarda en base de datos al nuevo usuario
  onRegister(): void {
    this.authService.registerUser(this.userEmail, this.userPass)
      .then((res) => {
        let record = {};
        record['Name'] = this.userName;
        record['Email'] = this.userEmail;
        record['Pass'] = this.userPass;

        this.authService.createUser(record).then(resp => {
          this.userName = "";
          this.userEmail = "";
          this.userPass = "";
          console.log(resp);
        })
          .catch(error => {
            console.log(error);
          });
      }).catch(error => console.log(error.message));
    this.getCurrentUser();
  }
}
