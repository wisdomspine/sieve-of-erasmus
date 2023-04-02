import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  SoeCellComponent,
  SoeCellGridComponent,
  SoeFooterComponent,
  SoePageArrowComponent,
} from '@soe';
import { InputPageComponent, PrimesComponent } from '@pages';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from '@core';

@NgModule({
  declarations: [AppComponent, InputPageComponent, PrimesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SoeFooterComponent,
    MatToolbarModule,
    SoePageArrowComponent,
    SoeCellComponent,
    SoeCellGridComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
