import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  atDropZone: boolean = false;

  files: FileItem[] = [];

  constructor(public _imgService: UploadImageService) { }

  loadImages() {
    this._imgService.uploadFirebaseImages(this.files)
  }

  ngOnInit() {
  }

  testingElement(event) {
    console.log(event);
  }
}
