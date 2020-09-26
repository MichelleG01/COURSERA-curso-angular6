import { destinoViaje } from './destino-viaje.model';

export class DestinosApiClient {
	destinos:destinoViaje[];
	constructor() {
       this.destinos = [];
	}
	add(d:destinoViaje){
	  this.destinos.push(d);
	}
	getAll(){
	  return this.destinos;
    }
}