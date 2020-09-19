import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { destinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: destinoViaje;
  @HostBinding('attr.class') cssClass = 'col-md-4';

  constructor() { }

  ngOnInit(): void {
  }

}
