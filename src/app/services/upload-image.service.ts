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
    const storageRef = firebase.storage().ref();
    for ( const item of images) {
      item.uploading = true;
      if (item.progress >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask = 
              storageRef.child(`${this.FOLDER_IMG}/${item.fileName}`)
                    .put(item.file);
      
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            ( error ) => console.log ('Error when uploading', error),
            () => {
              console.log('Imagen Cargada correctamente');
          
              uploadTask.snapshot.ref.getDownloadURL()
                .then((url) => {
                  item.url = url;
                  item.uploading = false;
                  this.saveImage({
                    name: item.fileName,
                    url: item.url
                });
              });
          
            }
        )
    }
  }

  private saveImage ( image: { name: string, url: string}) {
    this.db.collection(`${ this.FOLDER_IMG}`).add( image );
  }
}


