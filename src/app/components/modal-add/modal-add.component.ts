import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomersModel} from '../../models/customers.model';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})

export class ModalAddComponent {
  @Output() onModalClose = new EventEmitter<any>();

  addCustomerForm: FormGroup;

  constructor(private _userService: UserService) {
    this.addCustomerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'tel': new FormControl('', Validators.required),
    });
  }

  addCustomer(): void {
    const form = this.addCustomerForm.getRawValue();
    const customer = new CustomersModel(form.name, form.email, form.tel);
    this._userService.addCustomer(customer).subscribe(res => this.onModalClose.emit(res));
  }

  closeModal(): void {
    this.onModalClose.emit();
  }
}
