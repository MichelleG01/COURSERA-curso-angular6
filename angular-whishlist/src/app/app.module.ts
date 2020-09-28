import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//StoreModule as NgRxStoreModule. Esto es para que no haya un choque de nombres con lo que viene definido
import { StoreModule as NgRxStroreModule, ActionReducerMap} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosViajesEffects, DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes } from './models/destinos-viajes-state.modules';

// definiendo direcciones del nav
const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  {path: 'destino', component: DestinoDetalleComponent}
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

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
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
    StoreDevtoolsModule.instrument()   
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
