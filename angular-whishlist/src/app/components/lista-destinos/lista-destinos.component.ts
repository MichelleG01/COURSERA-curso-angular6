import { state } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../../models/destinos-viajes-state.modules';
import { destinoViaje } from './../../models/destino-viaje.model';
import { DestinosApiClient } from './../../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<destinoViaje>;
  //destinos: destinoViaje[];
  updates: string [];
  all;
  constructor(public destinosApiClient:DestinosApiClient, private store: Store<AppState>) { 
    //this.destinos = [];
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    /*el subscribeOn Change cuando nos suscribamos la primera vez, el primer evento que 
    nos va a llegar en este subscribe, es lo primero que estuvo en ese string de eventos en ese 
    observable y su primer valor fué null */
    /* this.destinosApiClient.subscribeOnchange((d: destinoViaje) => {
      if (d != null){
        this.updates.push('Se ha elegido a' + d.nombre);
      }
    }); */
    //suscribe para un observable de redux, el anterior era la forma manual
    // De esta manera estamos montado de manera reactiva a los cambios de estado de nuestra aplicación, solo la parte que nos interesa.
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null){
          this.updates.push('Se ha elegido a' + d.nombre);
        }
      });
      store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  ngOnInit(): void {
  }

  /*
  guardar(nombre:string, url:string):boolean {
    this.destinos.push(new DestinoViaje(nombre, url));
    //console.log(new DestinoViaje(nombre,url));
    //console.log(this.destinos);
    return false;
  }*/

  agregado(d: destinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    //this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegido(e: destinoViaje){
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);
    //se cambia para hacer uso de programacion reactiva
    //this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    //e.setSelected(true);
    this.destinosApiClient.elegir(e);
    //this.store.dispatch(new ElegidoFavoritoAction(e));
  }
}
