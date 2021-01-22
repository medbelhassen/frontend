import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from '../@root/shared.module';
import { MemberFormComponent } from './member-form/member-form.component';
import {LayoutComponent} from './layout/layout.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { OutilListComponent } from './outil-list/outil-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberFormComponent,
    LayoutComponent,
    PublicationListComponent,
    PublicationFormComponent,
    OutilFormComponent,
    OutilListComponent,
    EventFormComponent,
    EventListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxMatDatetimePickerModule,
    MaterialFileInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
