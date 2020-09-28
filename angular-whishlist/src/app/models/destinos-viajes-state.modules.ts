import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { destinoViaje } from './destino-viaje.model';

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

// ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down'
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

//agrupar todos los tipos de datos de las acciones
export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction
| VoteUpAction | VoteDownAction;

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