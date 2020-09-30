import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime,distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { destinoViaje } from '../../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<destinoViaje>
  fg: FormGroup;
  minLongitud = 4;
  searchResults: string[];

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
    /* this.fg.valueChanges.subscribe((form: any) =>{
      console.log('Cambio el formulario: ', form);
    }) */

  }

  ngOnInit(): void {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    //nos suscribimos cuando apretan una letra
    fromEvent(elemNombre, 'input')
    //Nos permite hacer operaciones en serie  
      .pipe(
        //obtenemos todo el contenido no solo la letra que presionaron ejm obtenemos hola no solo h
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        //que se quede en stop por este tiempo hasta que presionana otra tecla
        debounceTime(200),
        //esto hace que si me van llegando distintos valores del "pipe" anterior continue de lo contrario para
        distinctUntilChanged(),
        //cuando me llegue la variable vamos a hacer es como si estuviésemos consultando un "web service".
        switchMap(() => ajax('/assets/datos.json'))
        /*La palabra se la pasamos a una API de búsqueda y cuando esa API de búsqueda nos dé un mensaje de exito  
        nos vamos a suscribir a ese cambio*/
      ).subscribe(AjaxResponse => {
        this.searchResults = AjaxResponse.response;
      });
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
