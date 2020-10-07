import { Injectable, Inject, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { destinoViaje } from './destino-viaje.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.modules';
import { APP_CONFIG, AppConfig, MyDatabase, db} from './../app.module';
import { HttpRequest, HttpHeaders, HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';

//lo que tenemos que hacer es hacer que sea inyectable destinos API Client para que se pueda inyectar la dependencia, solo nuestra dependencia
@Injectable()
export class DestinosApiClient {
	destinos: destinoViaje[];
	//current: Subject<destinoViaje> = new BehaviorSubject<destinoViaje>(null);
	//constructor(private store: Store<AppState>) {
	constructor( private store: Store<AppState>,
		@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig, private http: HttpClient) {
			//Agregamos forwardRef al app_config porque es donde esta el end point de la API
			//Hacemos uso del HttpClient porque debemos hacer unas llamadas al webServices
			this.store
				.select(state => state.destinos)
				.subscribe((data) => {
					console.log('destinos sub store');
					console.log(data);
					this.destinos = data.items;
				});
			this.store
				.subscribe((data) => {
					console.log('all store');
					console.log(data);
				});
  }

	add(d: destinoViaje) {
	  //this.destinos.push(d);
	  //this.store.dispatch( new NuevoDestinoAction(d));

	  //Esta tecnica es usada para enviar un token de seguridad
	  //Aqui enviamos unas credenciales ficticias de autenticacion, ya que en el node.js no lo estamos validando
	  const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
	  //Lo que va en el body es un json, que tiene como atributo nombre y en el header un encabezado
	  //aqui estamos consultando y enviando informacion a la URL
	  const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
	  this.http.request(req).subscribe((data: HttpResponse<{}>) => {
		//Aqui no estamos validando estados de respuestas invalidas
		if (data.status === 200) { //Aqui verificamos que el servidor respondio
			this.store.dispatch(new NuevoDestinoAction(d));
			const myDb = db;
			myDb.destinos.add(d);
			console.log('todos los destinos de la db!');
			myDb.destinos.toArray().then(destinos => console.log(destinos))
		}
	  });
	}

	getAll(){
	  return this.destinos;
	}
	getById(id: string): destinoViaje{
		return this.destinos.filter(function(d){return d.isSelected.toString() == id; })[0];
	}
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