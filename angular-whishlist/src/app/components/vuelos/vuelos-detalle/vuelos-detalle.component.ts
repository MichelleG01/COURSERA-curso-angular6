import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detalle',
  templateUrl: './vuelos-detalle.component.html',
  styleUrls: ['./vuelos-detalle.component.css']
})
export class VuelosDetalleComponent implements OnInit {
  id: any;

  /*Aqui vamos a recibir el objeto "activatedRoute", que nos referencia la información relativa 
  a la ruta que actualmente está cargada en la URL al momento en que se está iniciando (cargando), 
  este componente. Entonces, de la ruta actual que figura nos vamos a suscribir 
  a los parámetros ("params"), y vamos a sacar el parámetro "Id" */
  
  /*El params['id'] sale de la configuración de la ruta en el app.module */
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
  }

}
