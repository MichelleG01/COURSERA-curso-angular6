import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { destinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<destinoViaje>
  fg: FormGroup;
  minLongitud = 4;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    // El "Form Group" nos representa al grupo de elementos del formulario ya construido
    this.fg = fb.group({
      //los "Form Controls" que estamos creando para poder vincular a los "tags" HTML.
      nombre: ['', Validators.compose([
        //"validators.compose", es una primitiva para componer un "array" de validadores
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });

    //observador de tipeo
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log('Cambio el formulario: ', form);
    })

  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean {
    const d = new destinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  //tipo de dato de retorno'required': true
  //Validadores customizados, personalizados
  nombreValidator(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;
    if (l>0 && l<5){
      return { invalidNombre: true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLing: number): ValidatorFn {
    return (control: FormControl) : { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l>0 && l<this.minLongitud){
        return { minLongNombre: true};
      }
      return null;
    }
  }
}
