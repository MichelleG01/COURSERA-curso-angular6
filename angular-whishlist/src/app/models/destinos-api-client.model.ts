import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { destinoViaje } from './destino-viaje.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.modules';

//lo que tenemos que hacer es hacer que sea inyectable destinos API Client para que se pueda inyectar la dependencia, solo nuestra dependencia
@Injectable()
export class DestinosApiClient {
	/*destinos: destinoViaje[];
	current: Subject<destinoViaje> = new BehaviorSubject<destinoViaje>(null); */
	constructor(private store: Store<AppState>) {
       //this.destinos = [];
	}
	add(d:destinoViaje) {
	  //this.destinos.push(d);
	  this.store.dispatch( new NuevoDestinoAction(d));
	}
	/*getAll(){
	  return this.destinos;
	}
	getById(id: string): destinoViaje{
		return this.destinos.filter(function(d){return d.isSelected.toString() == id; })[0];
	}*/
	elegir(d: destinoViaje){
		//empieza en null y a partir de ahí cuando le seteamos uno nuevo se va a propagar ese evento
		/*this.destinos.forEach(x => x.setSelected(false));
		d.setSelected(true);
		this.current.next(d);*/
		this.store.dispatch(new ElegidoFavoritoAction(d));
	}
	//Encapsular los datos para que otros se pueden suscribir
	/*subscribeOnchange(fn){
		this.current.subscribe(fn);
	}*/
}