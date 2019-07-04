import {Injectable} from '@angular/core';
import {PersonModel} from '../model/person.model';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class EmployeeFormService {

  private peopleObservable$ = new BehaviorSubject<PersonModel[]>([]);

  constructor() {
  }

  getCachedPeopleList() {
    return this.peopleObservable$;
  }

  setPeopleData(people: PersonModel[]) {
    return this.peopleObservable$.next(people);
  }

}
