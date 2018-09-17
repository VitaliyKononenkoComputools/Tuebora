export class CustomersModel {
  id: number;
  name: string;
  email: string;
  tel: string;
  date: string;

  constructor(name: string, email: string, tel: string) {
    this.name = name;
    this.email = email;
    this.tel = tel;
    this.date = new Date().toLocaleDateString();
  }
}
