import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = []; 
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter;

  constructor() { }

  @HostListener('dragover', ['$event'])
  public OnDragEnter(event: any) {
    this.mouseOver.emit( true );
    this._preventStop(event);
  }
 
  @HostListener('dragleave', ['$event'])
  public OnDragLeave(event: any) {
    this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public OnDrop(event: any) {
    const transfer = this._getTransfer(event);
    if (!transfer) {
      return;
    } // if there's nothing to transfer, quit

    this._extractFiles(transfer.files);
    this._preventStop(event);
    this.mouseOver.emit( false );
  }
  

  private _getTransfer (event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  } // function helps to compatibility between browsers

  private _extractFiles(fileList: FileList) {
       for (const property in Object.getOwnPropertyNames(fileList) ) {
      const temporalFile = fileList[property];
      if (this.fileCanBeUploaded( temporalFile )) {
        const newFile = new FileItem( temporalFile );
        this.files.push(newFile);
      }
    }
    console.log( this.files);
  }



  // VALIDATIONS

  private fileCanBeUploaded(file: File): boolean {
    if( !this._fileHasBeenDropped(file.name ) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventStop( event) {
    event.preventDefault();
    event.stopPropagation();
  } //Not opening imagen when droping

  private _fileHasBeenDropped(fileName: string): boolean {
    for (const file of this.files ) {
      if ( file.fileName === fileName) {
        console.log('File' + fileName + 'already exists');
        return true;
      }
    }

    return false;
  } // 


  private _isImage(fileType: string) : boolean {
    return (fileType === '' || fileType === undefined ) ? false : fileType.startsWith('image');
  } // Checking if it receives an image

}
