import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { UploadComponent } from './components/upload/upload.component';
import { APP_ROUTES } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';

import { UploadImageService } from './services/upload-image.service';
//  FIREBASE  //
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';



@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    UploadComponent,
    NavbarComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [UploadImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
