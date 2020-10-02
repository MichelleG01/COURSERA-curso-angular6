import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasListadoComponent } from './reservas-listado/reservas-listado.component';
import { ReservasDetalleComponent } from './reservas-detalle/reservas-detalle.component';
import { ReservasApiClientService } from './reservas-api-client.service';


@NgModule({
  declarations: [ReservasListadoComponent, ReservasDetalleComponent],
  providers: [
    //En el caso que nuestra dependencia tiene otras dependencias, esas dependencias tienen que figurar aquí
    ReservasApiClientService
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule
  ]
})
export class ReservasModule { }