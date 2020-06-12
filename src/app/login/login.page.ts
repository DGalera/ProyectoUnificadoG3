import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
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
  registerSuccess: boolean;
  registerError: string = '';

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
    public loadingCtrl: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.registerIsTapped = false;
    this.loginIsTapped = true;
  }

  // Muestra un modal de carga
  showLoading() {
    this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: "loader-class",
      spinner:"crescent",
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
    this.showLoading();
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.currentUser.email = user.email;
        this.users = this.authService.getUserName(this.currentUser.email).valueChanges();
        this.users.subscribe(data => {
          this.ActualUser = data;
          this.authService.setCurrentUser(this.ActualUser[0].Name);
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
        this.getCurrentUser();
      }).catch(error => {
        if (error.message.indexOf("email") !== -1) {
          this.loginError = "Introduce un email válido";
        } else if (error.message.indexOf("password") !== -1) {
          this.loginError = "Contraseña incorrecta";
        } else if (error.message.indexOf("record") !== -1) {
          this.loginError = "No hay ningún usuario registrado con ese correo";
        } else {
          this.loginError = "";
        }
        console.log("Error: ", error); if (this.loginError == '') {
          this.success = true;
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
        })
          .catch(error => {
            console.log(error);
          });
            this.authService.isLogged = true;
            this.getCurrentUser();
            this.registerToast();
      }).catch(error => {
        console.log(error.message);
        if (error.message.indexOf("email") !== -1) {
          this.registerError = "Debes introducir un email válido";
        } else if (error.message.indexOf("Password") !== -1 || (error.message.indexOf("password") !== -1)) {
          this.registerError = "La contraseña debe tener mínimo 6 caracteres";
        } else {
          this.registerError = '';
        }   
        if (this.registerError == '') {
          this.registerSuccess = true;
        } else {
          this.registerSuccess = false;
        }
      });
  }

  async registerToast() {
    const toast = await this.toastController.create({
      message: 'Te has registrado correctamente',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  changeForm(){
    this.loginIsTapped = true;
    this.registerIsTapped = false;
  }
}
