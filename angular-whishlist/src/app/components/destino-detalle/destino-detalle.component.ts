import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { destinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';

/*
//Si quisieramos sacar una nueva versión 
class DestinosApiClientViejo {
  getById(id: String): destinoViaje {
    console.log('llamando por la clase vieja!');
    return null;
  }
} */

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  //Se inyecta directamente la dependencia ya que no son  muchos los componentes que la utiliza
  //Pero ahora estamos migrando a la v2 que seria este
  //providers: [ DestinosApiClient ]
  providers: [
    DestinosApiClient
    //Para que no nos salga error debemos configurar el proovedor que seria asi:
    //{ provide: DestinosApiClientViejo, useExisting: DestinosApiClient }
    /*Ahora, en lo anterior no hay que inyectarle un DestinosApiClient viejo, sino que hay que inyectarle un 
      DestinosApiClient. Por un lado, DestinosApiClient y DestinosApiClient viejo tienen que tener 
      un interfaz, tienen que tener sus funciones públicas (compatibles), en este caso getById, 
      si no va a tirar error. */
  ]
})

export class DestinoDetalleComponent implements OnInit {
  destino: destinoViaje;

  style = {
    sources: {
      world: {
        type: 'geojson',
        //aquí estamos vinculando la información, un json, que tiene la información de los países a nivel mundial
        //solo es una capa basica, para mas detalles se debe agregar nuevos sources
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      //Aquí está la capa de esta metadata que se está cargando arriba. Le indicamos que solamente cargue la capa de países
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };

  //Y nuestros objetos dependen de esa clase vieja
  //constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) {}
  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) {}
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}