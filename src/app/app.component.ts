import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'library';
  items !: MenuItem[];
  constructor(@Inject(DOCUMENT) private document: Document,public translate: TranslateService) {
    translate.addLangs(['en', 'fa']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.items = [
      {label:  'Home', icon: 'pi pi-fw pi-home',routerLink:'/'},
      {label: 'Library', icon: 'pi pi-fw pi-clone ',routerLink:'library'},
      {label: 'borrow', icon: 'pi pi-fw pi-file-export',routerLink:'borrow'},
      {label: 'Person', icon: 'pi pi-fw pi-users',routerLink:'person'},
      {label: 'Book', icon: 'pi pi-fw pi-book',routerLink:'book'},
      {label: 'Category', icon: 'pi pi-fw pi-filter',routerLink:'category'},
    ];
  }






  switchLang(lang: string) {
    let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = lang === 'fa' ? 'rtl' : 'ltr';
    this.translate.use(lang);
  }
}
