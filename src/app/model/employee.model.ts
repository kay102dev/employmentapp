import {HrModel} from './hr.model';

export class EmployeeModel implements HrModel {
  employeeId: number;
  personId: number;
  employeeNumber: string;
  employedDate: Date;
  terminated: Date;

  static create(model: EmployeeModel) {
    const employeeModel = new EmployeeModel();
    employeeModel.employeeId = model.employeeId;
    employeeModel.personId = model.personId;
    employeeModel.employeeNumber = model.employeeNumber;
    employeeModel.employedDate = model.employedDate;
    employeeModel.terminated = model.terminated;
    return employeeModel;

  }
}
