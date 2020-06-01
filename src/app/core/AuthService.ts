import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../share/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;
  currentUser: UserInterface;
  currentUserName: string = '';

  usersList : any[];
  

  
  constructor(private firestore: AngularFirestore,
    public afsAuth: AngularFireAuth) { }

  getAllUsers(){
    return this.firestore.collection('Users').snapshotChanges();
  }

  createUser(record){
    return this.firestore.collection('Users').add(record);
  }

  getUserByid(record_id){
    this.firestore.collection('Users').doc(record_id).valueChanges();
  }

  // Registro de un nuevo usuario
  registerUser(email: string, pass: string){
    return new Promise( (resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      error => reject(error));
    });
  }

  // Login
  loginEmailUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
      error => reject(error));
    })
  }

  // Cierra sesión
  logoutUser(){
    this.afsAuth.signOut();
  }

  // Comprueba si el usuario introducido está autentificado
  isAuth(){
    return this.afsAuth.authState.pipe(auth => auth);
  }

  // Devuelve el nombre del usuario de la sesión
  getUserName(filter: string){
    return this.firestore.collection('Users', ref => ref.where('Email', '==', filter));
  }

  setCurrentUser(user: string){
    this.currentUserName = user;
  }
}

