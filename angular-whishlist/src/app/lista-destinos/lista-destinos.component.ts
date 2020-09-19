import { Component, OnInit } from '@angular/core';
import { destinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  destinos: destinoViaje[];
  constructor() { 
  	this.destinos = [];
  }

  ngOnInit(): void {
  }

  guardar(nombre:string, url:string):boolean {
  	this.destinos.push(new destinoViaje(nombre, url));
  	//console.log(this.destinos);
  	//Ponemos falso para no recargar la pagina ya que solo tenemos una por el momento
  	return false;
  }

}
