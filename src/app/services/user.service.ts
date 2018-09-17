import { CustomersModel } from './../models/customers.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class UserService {
  customersUrl = 'http://localhost:3000/customers/';

  constructor(private _http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this._http.get(this.customersUrl);
  }

  addCustomer(customer: CustomersModel): Observable<any> {
    return this._http.post(this.customersUrl, customer);
  }

  saveEditedCustomer(customer): Observable<any> {
    return this._http.put(this.customersUrl + customer.id, customer);
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this._http.delete(this.customersUrl + customerId);
  }

}
