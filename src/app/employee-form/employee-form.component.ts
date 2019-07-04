import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeModel} from '../model/employee.model';
import {PersonModel} from '../model/person.model';
import {EmployeeFormService} from '../services/employee-form.service';
import {PersonHttpService} from '../services/person-http.service';
import {Logger} from '../services/utitlities/logger';
import {Level} from '../services/utitlities/logger-level';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  personID: number;

  constructor(private formBuilder: FormBuilder,
              private employeeFormService: EmployeeFormService,
              private employeeHttpService: PersonHttpService) {
  }

  ngOnInit() {
    this.createForm();
    this.fetchPeopleDataAndUpdateID();

  }

  createForm() {
    this.employeeForm = this.formBuilder.group({
      employeeNumberFormControl: new FormControl('', [
        Validators.required
      ]),
      firstNameFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]),
      lastNameFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]),
      DOBFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{3} [a-zA-Z]{3} [0-9]{2} [0-9]{4} \\d+:\\d{2}:\\d{2} ?GMT(.)[0-9]{4} (.)?South Africa Standard Time(.)')
      ])

    });
  }

  get getControls() {
    return this.employeeForm.controls;
  }

  saveMemberDetails(form) {
    if (this.employeeForm.valid) {
      this.savePerson();
      this.saveEmployee();
      form.resetForm();
      Logger.log(Level.LOG, 'Form submitted');
    }

  }

  private savePerson() {
    this.employeeHttpService.create(this.createPersonModel(), environment.API_ENDPOINT_PEOPLE).subscribe((response) => {
      this.fetchPeopleDataAndUpdateID();
      Logger.log(Level.LOG, 'Create and Save the following Person... ', response);
    });
  }

  private saveEmployee() {
    this.employeeHttpService.create(this.createEmployeeCardModel(), environment.API_ENDPOINT_EMPLOYEES).subscribe((response) => {
      Logger.log(Level.LOG, 'Create and Save the following Employee... ', response);
      // this.clearControls();
    });
  }

  fetchPeopleDataAndUpdateID() {
    this.employeeHttpService.read(environment.API_ENDPOINT_PEOPLE).subscribe((people) => {
      this.employeeFormService.setPeopleData(people);
      this.findHighestID(people);
      return people;
    });
  }

  findHighestID(people: PersonModel[]) {
    if (people) {
      const highestPerson = people.reduce((a, b) => {
        return a.personId > b.personId ? a : b;
      });
      this.personID = highestPerson.personId;
    }
  }


  private createPersonModel() {
    return PersonModel.create({
      personId: this.getEmployeeId(),
      lastName: this.employeeForm.value.firstNameFormControl,
      firstName: this.employeeForm.value.lastNameFormControl,
      birthDate: new Date(this.employeeForm.value.DOBFormControl).toISOString()
    });

  }

  private createEmployeeCardModel() {
    // TODO : All contracts end by 2020 for now, allow users to determine termination date as per contract
    return EmployeeModel.create({
      personId: this.getEmployeeId(),
      employeeId: this.getEmployeeId(),
      employeeNumber: this.employeeForm.value.employeeNumberFormControl,
      employedDate: new Date(),
      terminated: new Date('December 12, 2020 00:00:00')
    });
  }

  getEmployeeId() {
    return this.personID + 1;
  }

  clearControls() {
    this.getControls.employeeNumberFormControl.setValue('');
    this.getControls.firstNameFormControl.setValue('');
    this.getControls.lastNameFormControl.setValue('');
    this.getControls.DOBFormControl.setValue('');
  }
}

