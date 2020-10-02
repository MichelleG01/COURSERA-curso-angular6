import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservasApiClientService {

  constructor() { }

  //Agregamos el comportamiento para ese servicio
  getAll() {
    return [{ id: 1, name: 'uno' }, {id: 2, name: 'dos' }];
  }
}
