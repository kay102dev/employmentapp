import {AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {EmployeeFormService} from '../services/employee-form.service';
import {EmployeeModel} from '../model/employee.model';
import {PersonModel} from '../model/person.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonHttpService} from '../services/person-http.service';
import {AbstractCrudService} from '../services/AbstractCrud.service';
import {Logger} from '../services/utitlities/logger';
import {Level} from '../services/utitlities/logger-level';
import {UtilService} from '../services/utitlities/util.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {


  people: PersonModel[];
  person: PersonModel;

  employees: EmployeeModel[];
  employee: EmployeeModel;

  constructor(private employeeFormService: EmployeeFormService,
              private employeeHttpService: PersonHttpService,
              private utilService: UtilService) {
  }


  ngOnInit() {
    this.getPeopleList();

    this.getCachedPeopleList$();

    this.getEmployeeList();


  }


  deleteMemberDetails(id: number) {
    this.deleteEmployee(id).then(result => {
      this.deletePerson(id);
    }).then((result) => {
      Promise.resolve(result);
    }).catch(err => {
      Logger.log(Level.ERROR, 'Error deleting member Details', err);
    });
  }


  private deleteEmployee(id) {
    return this.employeeHttpService.delete(id, environment.API_ENDPOINT_EMPLOYEES).toPromise();
  }

  private deletePerson(id) {
    this.employeeHttpService.delete(id, environment.API_ENDPOINT_PEOPLE).subscribe((reponse) => {
      this.getPeopleList();
    });
  }


  private updateDeletedMemberDetails(employee) {
    return EmployeeModel.create({
      personId: employee.personId,
      employeeId: employee.employeeId,
      employeeNumber: employee.employeeNumber,
      employedDate: employee.employedDate,
      terminated: new Date()
    });
  }

  updateMemberDetails(person: PersonModel) {
    this.person = person;
  }

  private getPeopleList() {
    this.employeeHttpService.read(AbstractCrudService.peopleUrl).subscribe((people) => {
      this.employeeFormService.setPeopleData(people);
      this.people = people;
    });
  }

  private getEmployeeList() {
    this.employeeHttpService.read(AbstractCrudService.employeeUrl).subscribe((employees) => {
      this.employees = employees;
    });
  }

  private getCachedPeopleList$() {
    this.employeeFormService.getCachedPeopleList().subscribe((people) => {
      this.people = people;
    });
  }

  private updateEmployee(id: number) {
    // TODO: // Do soemthing with specific Employed Member
    const finderMethod = this.utilService.findMemberByID(id, this.employee);
  }
}
