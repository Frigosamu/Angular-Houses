import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormHousingComponent } from './form-housing/form-housing.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormHousingComponent, RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
