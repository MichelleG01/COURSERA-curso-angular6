import { Injectable } from '@angular/core';

//Es un servicio inyectable
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: string, password: string): boolean {
    if (user === 'user' && password === 'password') {
      //localStorage, es un objeto de HTML5 que nos permite guardar valores en el navegador por mas que nuestro
      //componenete sea descartable. Esto significa que por mas que sigamos navegando, recarguemos la pagina,
      //etc persiste un valor llamado username
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
