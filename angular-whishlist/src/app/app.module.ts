import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//StoreModule as NgRxStoreModule. Esto es para que no haya un choque de nombres con lo que viene definido
import { StoreModule as NgRxStroreModule, ActionReducerMap} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { DestinosViajesEffects, DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes } from './models/destinos-viajes-state.modules';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { ReservasModule } from './reservas/reservas.module';

//Agregamos las rutas hijas de vuelos (anidadas), es un conjunto de rutas adicionales
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponent },
  { path: 'mas-info', component: VuelosMasInfoComponent },
  { path: ':id', component: VuelosDetalleComponent },
];

// definiendo direcciones del nav
//Estan son las rutas raiz para el modulo de ruteo
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  //El ":" es el que Angular reconoce como "token", como carácter, para identificar que estamos indicando una parametrización por URL
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'destino', component: DestinoDetalleComponent},
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard ]
  },
  //Con esto las rutas raices reconocen las rutas hijas de vuelo
  {
    path: 'vuelos',
    //el componente que se va a cargar
    component: VuelosComponent,
    //aqui puedo acceder si estoy logueado
    canActivate: [ UsuarioLogueadoGuard ],
    //Aunque por defecto se cargue este componente, va a tener rutas hijas, es decir, 
    //que voy a poder hacer "/vuelos" entro aquí: UsuarioLogueadoGuard, y "/vuelos/home" 
    //entro aquí: ListaDestinosComponent
    children: childrenRoutesVuelos
  }
];

// redux init
//estado global de la aplicacion
export interface AppState {
  destinos: DestinosViajesState;
}

//los reducers globales de la aplicación
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

//inicialización
const reducersInitialState = {
    destinos: intializeDestinosViajesState()
};
// fin redux init

// configuración de la aplicación, para la inyeccion de dependencias. Variables de configuración.
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// configuración de la aplicación fin

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent,
    VuelosDetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //registrando las rutas
    FormsModule, //agregar un formulario
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    //De esta manera, estamos registrando en el import de nuestro módulo los reducers, todos los reducers de todos nuestros features.
    NgRxStroreModule.forRoot(reducers, {
      initialState: reducersInitialState,
      //solucion al error Cannot add property selected, object is not extensible
      //Sin embargo no es la forma correcta. La documentación sugiere una solución para estos casos
      //https://ngrx.io/guide/store/configuration/runtime-checks
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    //Aquí uno puede declarar todos los effects de todos los features, es un array, podríamos pasar todos los que quisiésemos.
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule   
  ],
  providers: [    
    AuthService,    
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
