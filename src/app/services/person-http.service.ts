import {Injectable} from '@angular/core';
import {PersonModel} from '../model/person.model';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AbstractCrudService} from './AbstractCrud.service';
import {EmployeeFormService} from './employee-form.service';
import {Logger} from './utitlities/logger';
import {Level} from './utitlities/logger-level';
import {EmployeeModel} from '../model/employee.model';
import {UtilService} from './utitlities/util.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class PersonHttpService implements AbstractCrudService {
  constructor(
    private http: HttpClient,
    private employeeFormService: EmployeeFormService, private utilService: UtilService
  ) {
  }

  /** POST: Create a new Person to the database */
  create(model: PersonModel | EmployeeModel, url: string): Observable<PersonModel> {
    return this.http.post<PersonModel>(url, model, httpOptions)
      .pipe(map(
        (response: any) => {
          Logger.log(Level.LOG, 'Save Member details to the database... ', response);
          return response;
        },
        (error) => {
          this.exceptionErrorHandler(error);
        }
        )
      );
  }

  /** PUT: update an existing Person to the database */
  update(model: PersonModel | EmployeeModel, i: number, url: string): Observable<any> {
    return this.http.put(`${url + '/' + i}`, model, httpOptions)
      .pipe(map(
        (response: any) => {
          Logger.log(Level.LOG, 'Update an existing Member to the database with ID... ' + i, response);
          return response;
        },
        (e) => {
          Logger.log(Level.ERROR, 'Error on Updating of an existing Member with ID... ' + i, e);
          this.exceptionErrorHandler(e);
        }
        )
      );
  }

  /** GET: fetch all people from the database */
  read(url: string): Observable<any> {
    return this.http.get(url, httpOptions)
      .pipe(map(
        (response: PersonModel[]) => {
          Logger.log(Level.LOG, 'Fetch and retrieve all people from the database... ', response);
          Logger.log(Level.LOG, 'Cache Latest people Data... ', response);
          this.employeeFormService.setPeopleData(response);
          this.utilService.trimAllValues(response);
          return response;
        },
        (e) => {
          Logger.log(Level.ERROR, 'Error fetching people ', e);
          this.exceptionErrorHandler(e);
        }
        )
      );
  }

  /** DELETE: delete an existing Person from the database */
  delete(i: number, url: string): Observable<PersonModel[]> {
    return this.http.delete(`${url + '/' + i}`, httpOptions)
      .pipe(map(
        (response: any) => {
          Logger.log(Level.LOG, 'Delete an existing Person from the database with ID... ', +i, response);
          return response;
        },
        (e) => {
          Logger.log(Level.ERROR, 'Error deleting an existing Person from the database with ID... ', +i, e);
          this.exceptionErrorHandler(e);
        }
        )
      );
  }

  private exceptionErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // TODO: Handle technical HTTP errors and display user friendly response to client
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // TODO: Handle APP backend errors and display user friendly response to client
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
