import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError: string;

  constructor(public authService: AuthService) {
    this.mensajeError = '';
  }

  ngOnInit() {
  }

  login(username: string, password: string): boolean {
    this.mensajeError = '';
    /* le pedimos hacer el login sincrónico en este caso, tal vez si fuésemos hasta un servidor 
    /en el AuthService esto sería asincrónico, aquí es sincrónico porque vamos a estar chequeando 
    contra unos datos constantes que vamos a tener dentro del AuthService. */
    if (!this.authService.login(username, password)) {
      //Si nos da errones el login
      this.mensajeError = 'Login incorrecto.';
      setTimeout(function() {
        this.mensajeError = ''; //Se limpia el mensaje despues de mostrarlo
        //mostramos login incorrecto despues de 2.5 segundos
      }.bind(this), 2500);
    }
    return false; //retornamos falso porque el login lo estamos vinculando a una función click, entonces
    //no queremos que siga el vinculo
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
