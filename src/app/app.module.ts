import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import {EmployeeFormService} from './services/employee-form.service';
import { HttpClientModule } from '@angular/common/http';
import {EmployeeTableComponent} from './employee-table/employee-table.component';
import {UtilService} from './services/utitlities/util.service';
import { EmployeeUpdateComponent } from './employee-table/employee-update/employee-update.component';
import {PersonHttpService} from './services/person-http.service';

export const DDMMYY = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    EmployeeFormComponent,
    EmployeeUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: DDMMYY, useClass: ShowOnDirtyErrorStateMatcher},
    MatDatepickerModule,
    EmployeeFormService,
    UtilService,
    PersonHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



