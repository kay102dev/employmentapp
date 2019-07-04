import {HrModel} from './hr.model';

export class PersonModel implements HrModel {
  public personId:	number;
  public lastName: string;
  public firstName: string;
  public birthDate: string;

  static create(model: PersonModel) {
    const personalModel = new PersonModel();
    personalModel.personId = model.personId;
    personalModel.lastName = model.lastName;
    personalModel.firstName = model.firstName;
    personalModel.birthDate = model.birthDate;
    return personalModel;
  }
}
