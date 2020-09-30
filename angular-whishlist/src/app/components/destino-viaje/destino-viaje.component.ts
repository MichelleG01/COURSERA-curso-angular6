import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { destinoViaje } from './../../models/destino-viaje.model';
import { VoteUpAction, VoteDownAction } from './../../models/destinos-viajes-state.modules';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
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
