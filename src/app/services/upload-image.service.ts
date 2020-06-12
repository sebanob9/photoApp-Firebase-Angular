import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  
  private FOLDER_IMG = 'img';

  constructor(private db: AngularFirestore) {}

  uploadFirebaseImages(images: FileItem[]) {
    console.log(images);
  }

  private saveImage ( image: { name: string, url: string}) {
    this.db.collection(`${ this.FOLDER_IMG}`)
      .add( image );
  }
}
