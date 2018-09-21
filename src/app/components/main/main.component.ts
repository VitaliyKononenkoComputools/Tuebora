import { CustomersModel } from './../../models/customers.model';
import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private _userService: UserService, public snackBar: MatSnackBar) {
    this.getCustomers();
  }

  deleteShow = false;
  addCustomer = false;
  isEdit: number;
  editStart = false;
  customers: CustomersModel[];
  filteredCustomers = [];
  customersAll = 0;
  customersPerPage = 10;
  currentPage = 0;
  buttonCount: any;
  searchVal = '';
  selectedCustomer: CustomersModel;

  getCustomers(): void {
    this._userService.getCustomers().subscribe((res: CustomersModel[]) => {
      this.customers = res;
      this.sortCustomers();
      this.filteredCustomers = this.customers.slice(this.currentPage, this.customersPerPage);
      this.customersAll = this.customers.length;
      this.buttonCount = this.getButtonCount();
    });
  }

  sortCustomers(): void {
    this.customers = this.customers.sort( (a, b ): any => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      }
    });
  }

  getButtonCount(): Array<any> {
    return new Array(Math.ceil(this.customersAll / this.customersPerPage));
  }

  selectPage(num: number): void {
    if (num !== this.currentPage) {
      this.currentPage = num;
    }

    const begin = this.currentPage * this.customersPerPage;
    const end = begin + this.customersPerPage;
    this.filteredCustomers = this.customers.slice(begin, end);
  }

  addNewCustomer(customer: CustomersModel): void {
    this.addCustomer = !this.addCustomer;
    if (customer) {
      this.filteredCustomers.push(customer);
      this.customers = this.filteredCustomers;
      this.customersAll = this.filteredCustomers.length;
      this.snackBar.open('Adding successful', 'Close', {duration: 3000});
    }
    this.getCustomers();
  }

  deleteModal(customer: CustomersModel): void {
    this.selectedCustomer = customer;
    this.deleteShow = !this.deleteShow;
  }

  delete(customer: CustomersModel): void {
    this.snackBar.open('Deleting successful', 'Close', {duration: 3000});
    this.filteredCustomers.splice(this.filteredCustomers.indexOf(customer), 1);
    this.customers = this.filteredCustomers;
    this._userService.deleteCustomer(customer.id).subscribe(res => this.getCustomers());
    this.customersAll = this.filteredCustomers.length;
    this.deleteShow = !this.deleteShow;
  }

  edit(customer: CustomersModel): void {
    this.isEdit = customer.id;
    this.selectedCustomer = customer;
    this.editStart = true;
  }

  save(): void {
    this.filteredCustomers.map(res => {
      if (res.id === this.selectedCustomer.id) {
        res.name = this.selectedCustomer.name;
        res.email = this.selectedCustomer.email;
        res.tel = this.selectedCustomer.tel;
        this.snackBar.open('Editing successful', 'Close', {duration: 3000});
      }
    });
    this._userService.saveEditedCustomer(this.selectedCustomer).subscribe(res => res);
    this.editStart = false;
    this.isEdit = null;
  }

  search(value: string): void {
    if (value.length > 0) {
      this.filteredCustomers = this.customers.filter((res: CustomersModel) => {
        if (res.name.toLowerCase().includes(value) ||
            res.email.toLowerCase().includes(value) ||
            res.tel.includes(value)) {
          return res;
        }
      });
    } else {
      this.getCustomers();
    }
  }
}
