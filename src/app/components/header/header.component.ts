import {Component} from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  language: string;

  constructor() { this.language = localStorage.getItem('lang'); }

  changeLang(): void {
    localStorage.setItem('lang', this.language);
    location.reload();
  }
}
