import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {PasswordModule} from "primeng/password";
import { LibraryCMPComponent } from './library-cmp/library-cmp.component';
import { HomeComponent } from './home/home.component';
import { PersonCMPComponent } from './person-cmp/person-cmp.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule, Routes} from "@angular/router";
import {TabMenuModule} from 'primeng/tabmenu';
import {InputTextModule} from 'primeng/inputtext';
import {LibraryService} from "./service/library/impl/library.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BookCMPComponent } from './book-cmp/book-cmp.component';
import {BookService} from "./service/Book/impl/book.service";
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryCMPComponent } from './category-cmp/category-cmp.component';
import {CategoryService} from "./service/category/impl/category.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonService} from "./service/person/impl/person.service";
import { CatListComponent } from './category-cmp/cat-list/cat-list.component';
import { CatDialogComponent } from './category-cmp/cat-dialog/cat-dialog.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import { BorrowCMPComponent } from './borrow-cmp/borrow-cmp.component';
import {BorrowService} from "./service/borrow/impl/borrow.service";
import { FilterPipePipe } from './filter-pipe.pipe';
import { FilterPersonPipe } from './filter-person.pipe';
import {TableModule} from 'primeng/table';
import { DividerModule } from "primeng/divider"
import { ToastModule } from "primeng/toast";
import {MessageService} from "primeng/api";
import { NgxPaginationModule } from 'ngx-pagination';
import {FilesService} from "./service/files/impl/files.service";
import {CheckboxModule} from 'primeng/checkbox';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// import { ImageUploadComponent } from './components/image-upload/image-upload.component'

const route : Routes = [
  {path: '', component:HomeComponent},
  {path: 'library', component: LibraryCMPComponent},
  {path: 'person', component: PersonCMPComponent},
  {path: 'book', component: BookCMPComponent},
  {path: 'category', component: CategoryCMPComponent},
  {path: 'borrow', component: BorrowCMPComponent},
  {path: '404', component:NotFoundComponent},
  {path: '**', redirectTo: '/404'},
]

@NgModule({
  declarations: [
    AppComponent,
    LibraryCMPComponent,
    HomeComponent,
    PersonCMPComponent,
    NotFoundComponent,
    BookCMPComponent,
    CategoryCMPComponent,
    CatListComponent,
    CatDialogComponent,
    BorrowCMPComponent,
    FilterPipePipe,
    FilterPersonPipe,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    PasswordModule,
    RouterModule.forRoot(route),
    TabMenuModule,
    InputTextModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    InputSwitchModule,
    CalendarModule,
    TableModule,
    DividerModule,
    ReactiveFormsModule,
    ToastModule,
    NgxPaginationModule,
    CheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [LibraryService,BookService,CategoryService, PersonService, BorrowService,MessageService, FilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
