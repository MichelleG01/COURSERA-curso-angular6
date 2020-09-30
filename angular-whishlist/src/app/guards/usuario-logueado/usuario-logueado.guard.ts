import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoGuard implements CanActivate {
  
  constructor(private authService: AuthService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;

    /*Aqui lo que se haces es cumplir CanActivate y básicamente nos dice si de acuerdo a este estado 
    de la ruta, y a la del siguiente elemento que estaríamos navegando éste guard se activa como verdadero. 
    Nosotros en este caso puntual no necesitamos utilizar esos objetos porque directamente sabemos 
    que este guard se activa si auth.service.ts dice que está logeado el usuario */

    const isLoggedIn = this.authService.isLoggedIn();
    console.log('canActivate', isLoggedIn);
    return isLoggedIn;

  }
  


}
