import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { destinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  //Se inyecta directamente la dependencia ya que no son  muchos los componentes que la utiliza
  providers: [DestinosApiClient]
})
export class DestinoDetalleComponent implements OnInit {
  destino: destinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
