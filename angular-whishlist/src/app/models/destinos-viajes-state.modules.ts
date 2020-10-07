import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { destinoViaje } from './destino-viaje.model';
import { DestinosApiClient } from './destinos-api-client.model';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

// ESTADO
export interface DestinosViajesState {
    items: destinoViaje[];
    loading: boolean;
    favorito: destinoViaje;
}

//ubica agrupadamente todas las operaciones del estado
export function intializeDestinosViajesState() {
  return {
    items: [],
    loading: false,
    favorito: null
  };
}

// Clases que representan ACCIONES
export enum DestinosViajesActionTypes {
  //enums de string con el texto descriptivo del tipo de mi evento
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down',
  INIT_MY_DATA = '[Destinos Viajes] Init My Data' 
}

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: destinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: destinoViaje) {}
}

export class VoteUpAction implements Action {
  type = DestinosViajesActionTypes.VOTE_UP;
  constructor(public destino: destinoViaje) {}
}

export class VoteDownAction implements Action {
  type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor(public destino: destinoViaje) {}
}

export class InitMyDataAction implements Action {
  type = DestinosViajesActionTypes.INIT_MY_DATA;
  constructor(public destinos: string[]) {} //recibimos un array de string o podria ser un objeto destinoViaje ya construido
}

//agrupar todos los tipos de datos de las acciones
export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction
| VoteUpAction | VoteDownAction | InitMyDataAction;

// REDUCERS, cada vez que se dispara una accion se llaman los reducers y se ejecutan en el orden definido
export function reducerDestinosViajes(
  state: DestinosViajesState,
  action: DestinosViajesActions
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
          ...state,
          items: [...state.items, (action as NuevoDestinoAction).destino ]
        };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
        state.items.forEach(x => x.setSelected(false));
        const fav: destinoViaje = (action as ElegidoFavoritoAction).destino;
        fav.setSelected(true);
        return {
          ...state,
          favorito: fav
        };
    }
    case DestinosViajesActionTypes.VOTE_UP: {
      const d: destinoViaje = (action as VoteUpAction).destino;
      d.voteUp();
      return { ...state };
    }
    case DestinosViajesActionTypes.VOTE_DOWN: {
      const d: destinoViaje = (action as VoteDownAction).destino;
      d.voteDown();
      return { ...state };
    }
    case DestinosViajesActionTypes.INIT_MY_DATA: {
      const destinos: string[] = (action as InitMyDataAction).destinos;
      return {
          ...state, //alteramos el state, ya que el items esta vacio. No se llama arriba cuando se inicializa
          //porque es una llamada asincronica y el inicializador que nos pide Redux en el AppModule es sincrónico
          items: destinos.map((d) => new destinoViaje(d, ''))
        };
    }
  }
  return state;
}

// EFFECTS, las acciones son pasadas a los efects del sistema. Lo que hace es registrar una nueva accion 
//como consecuencia de otra acción
@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
    map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  );

  constructor(private actions$: Actions) {}
}