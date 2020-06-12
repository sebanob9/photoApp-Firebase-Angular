import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter;

  constructor() { }

  @HostListener('dragover', ['$event'])
  public OnDragEnter(event: any) {
    this.mouseOver.emit( true );
  }
 
 /*  @HostListener('dragleave', ['$event'])
  public OnDragLeave(event: any) {
    this.mouseOver.emit( false );
  }
 */

}
