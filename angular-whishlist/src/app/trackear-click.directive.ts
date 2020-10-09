import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appTrackearClick]'
})
export class TrackearClickDirective {
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) { //podemos recibir por inyeccion de dependencias elementos sobre el
    //cual estamos inyectando esta directiva
    this.element = elRef.nativeElement; //aqui guardo la referencia
    fromEvent(this.element, 'click').subscribe(evento => this.track(evento)); //con programacion reactiva me 
    //me suscribo al click. Cada vez que le den click al elemento de suscribo al callBack this.track(evento)
  }

  track(evento: Event): void {
    const elemTags = this.element.attributes.getNamedItem('data-trackear-tags').value.split(' ');
    console.log(`||||||||||| track evento: "${elemTags}"`);
  }
}