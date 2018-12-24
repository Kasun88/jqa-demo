import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class AdminWidgetDataServiceService {

  constructor(private http: Http) { }


  public query(endPoint: string, query: string): Observable<any> {
    return this.http
      .post(endPoint, query)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }


  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
