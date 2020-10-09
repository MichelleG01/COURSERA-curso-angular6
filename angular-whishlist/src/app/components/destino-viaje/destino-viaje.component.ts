import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { destinoViaje } from './../../models/destino-viaje.model';
import { VoteUpAction, VoteDownAction } from './../../models/destinos-viajes-state.modules';
import { trigger, state, style, transition, animate } from '@angular/animations';
//El operador trigger que es el que nos sirve para darle un nombre y agrupar toda la información 
//a la lógica de una animación. ejm Hacer que algo cambie de color
//stage: Porque siempre que tengamos una animación, al menos dos estados vamos a tener para que 
//haya justamente una transición de estados

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [ //recibe un array de animaciones
    trigger('esFavorito', [
        state('estadoFavorito', style({
          backgroundColor: 'PaleTurquoise'
        })),
        state('estadoNoFavorito', style({
          backgroundColor: 'WhiteSmoke'
        })),
        transition('estadoNoFavorito => estadoFavorito', [
          animate('3s')
        ]),
        transition('estadoFavorito => estadoNoFavorito', [
          animate('1s')
        ]),
    ])
  ]

})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: destinoViaje;
  //No en todos los casos se debe renombrar la variable, por ejemplo si queremos
  //que no sea position sino custom. Ejm indice index
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<destinoViaje>;
  
  constructor(private store: Store<AppState>) { 
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }

}
