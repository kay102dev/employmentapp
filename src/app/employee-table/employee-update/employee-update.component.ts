import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PersonModel} from '../../model/person.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeFormService} from '../../services/employee-form.service';
import {PersonHttpService} from '../../services/person-http.service';
import {AbstractCrudService} from '../../services/AbstractCrud.service';
import {EmployeeModel} from '../../model/employee.model';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit, OnChanges {

  updateEmployeeForm: FormGroup;
  personalID: number;
  @Input() personData: PersonModel;

  constructor(private formBuilder: FormBuilder,
              private employeeFormService: EmployeeFormService,
              private employeeHttpService: PersonHttpService) {


    this.updateEmployeeForm = this.formBuilder.group({
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


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setUpdateControls(changes.personData.currentValue);
  }


  get getControls() {
    return this.updateEmployeeForm.controls;
  }

  setUpdateControls(person: PersonModel) {
    if (person) {
      this.personalID = person.personId;
      this.getControls.firstNameFormControl.setValue(person.firstName);
      this.getControls.lastNameFormControl.setValue(person.lastName);
      this.getControls.DOBFormControl.setValue(person.birthDate);

    }
  }


   saveUpdatedPersonalInfo() {
    const model = this.createUpdatedPersonalModel();
    this.employeeHttpService.update(model, this.personalID, AbstractCrudService.peopleUrl).subscribe(() => {
      this.fetchUpdatedPeopleList();
    });
  }

  private createUpdatedPersonalModel() {
    return PersonModel.create({
      personId: this.personalID,
      firstName: this.updateEmployeeForm.value.firstNameFormControl,
      lastName: this.updateEmployeeForm.value.lastNameFormControl,
      birthDate: new Date(this.updateEmployeeForm.value.DOBFormControl).toISOString()
    });
  }

  private fetchUpdatedPeopleList() {
    this.employeeHttpService.read(AbstractCrudService.peopleUrl).subscribe((people) => {
      this.employeeFormService.setPeopleData(people);
    });
  }

}
