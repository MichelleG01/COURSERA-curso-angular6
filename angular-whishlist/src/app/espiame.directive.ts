import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({ 
  selector: '[appEspiame]' 
})

export class EspiameDirective implements OnInit, OnDestroy {
  //OnInit es una interfaz y nos obliga a implementar ngOnInit y ngOnDestroy
  static nextId = 0; //esta variable es compartida las n instancias de la directiva espiame
  //la comilla especial (`), nos permite hacer uso de lo que se conoce como "interpolación de cadenas"
  log = (msg: string) => console.log(`Evento #${EspiameDirective.nextId++} ${msg}`);
  ngOnInit() { this.log(`########******** onInit`); }
  ngOnDestroy() { this.log(`########******** onDestroy`); }
}
