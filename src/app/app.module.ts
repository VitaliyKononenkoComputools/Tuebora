import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {MainComponent} from './components/main/main.component';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {ModalAddComponent} from './components/modal-add/modal-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalDeleteComponent} from './components/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ModalAddComponent,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, { provide: LOCALE_ID, useValue: 'en' }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
