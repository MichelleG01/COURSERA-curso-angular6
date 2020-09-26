import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { destinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<destinoViaje>
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    // El "Form Group" nos representa al grupo de elementos del formulario ya construido
    this.fg = fb.group({
      //los "Form Controls" que estamos creando para poder vincular a los "tags" HTML.
      nombre: [''],
      url: ['']
    });

    //observador de tipeo
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log('cambio el formulario: ', form);
    })

  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean {
    const d = new destinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

}
