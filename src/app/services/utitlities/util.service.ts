import {Injectable} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;
import {Logger} from './logger';
import {Level} from './logger-level';

@Injectable()
export class UtilService {
  constructor() {
  }

  trimValue(value: string): string {
    return value.trim();
  }

  findMemberByID(id, data) {
    data.forEach((employee) => {
      if (Object.values(employee).indexOf(id) > -1) {
        return employee;
      }
    });
  }

  trimAllValues(data) {
    data.forEach((obj) => {
      Object.keys(obj).map(p => {
        if (obj[p] !== null) {
          obj[p] = obj[p].toString().trim();
          // convert personal ID to numbers
          if (p === 'personId') {
            console.log('obj', parseInt(obj[p], 0));
            obj[p] = parseInt(obj[p], 0);
          }
        }

      });
    });
    Logger.log(Level.LOG, 'Data has been Trimmed... ', data);
  }


}
