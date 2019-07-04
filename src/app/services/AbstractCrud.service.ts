import {Injectable} from '@angular/core';
import {PersonModel} from '../model/person.model';
import {EmployeeModel} from '../model/employee.model';

@Injectable()
export abstract class AbstractCrudService {

  public static peopleUrl = '/api/People';
  public static employeeUrl = '/api/Employees';
  constructor() {}
  abstract create(data: PersonModel | EmployeeModel, url: string);
  abstract read(url: string);
  abstract update(data: PersonModel | EmployeeModel, employeeId: number, url: string);
  abstract delete(employeeId: number, url: string);
}
