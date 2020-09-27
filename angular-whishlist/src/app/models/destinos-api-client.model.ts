import { BehaviorSubject, Subject } from 'rxjs';
import { destinoViaje } from './destino-viaje.model';

export class DestinosApiClient {
	destinos: destinoViaje[];
	current: Subject<destinoViaje> = new BehaviorSubject<destinoViaje>(null);
	constructor() {
       this.destinos = [];
	}
	add(d:destinoViaje) {
	  this.destinos.push(d);
	}
	getAll(){
	  return this.destinos;
	}
	getById(id: string): destinoViaje{
		return this.destinos.filter(function(d){return d.isSelected.toString() == id; })[0];
	}
	elegir(d: destinoViaje){
		//empieza en null y a partir de ahí cuando le seteamos uno nuevo se va a propagar ese evento
		this.destinos.forEach(x => x.setSelected(false));
		d.setSelected(true);
		this.current.next(d);
	}
	//Encapsular los datos para que otros se pueden suscribir
	subscribeOnchange(fn){
		this.current.subscribe(fn);
	}
}