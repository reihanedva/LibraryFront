import {IBorrowInterface} from "../borrow.interface";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../../../Model/categoryModel";
import {Observable} from "rxjs";
import {BorrowModel} from "../../../Model/borrowModel";
import {PersonsModel} from "../../../Model/personsModel";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {LibraryModel} from "../../../Model/libraryModel";
@Injectable()
export class BorrowService implements IBorrowInterface{
  constructor(private httpClint: HttpClient) {}

  url: string = 'http://192.168.10.80:8080/library/borrow/'

  getAllBorrow(): Observable<BorrowModel[]> {
    return this.httpClint.get<BorrowModel[]>(this.url + 'getAll')
  }
  searchPerson(id: number): Observable<PersonsModel> {
  return this.httpClint.get<PersonsModel>(this.url + 'get?id=' + id)
  }
  addBorrow(borrow : BorrowModel): Observable<void>{
    return this.httpClint.post<void>(this.url + 'add',borrow)
  }
  getAllPerson(person : number): Observable<BorrowModel[]> {
    return this.httpClint.get<BorrowModel[]>(this.url + 'getPersonById?id='+ person)
  }

  lendingBooks(borrow : BorrowModel):Observable<BorrowModel>{
    return this.httpClint.post<BorrowModel>(this.url + 'lendingBooks' , borrow)
  }

  Returnbooks(id : number):Observable<boolean>{
    return this.httpClint.delete<boolean>(this.url + 'returnbooks/' + id)
  }

  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<BorrowModel[]> {
    return this.httpClint.get<BorrowModel[]>(this.url + 'getAWPAS/'+pageNum+'/'+pageSize+'/'+field)
  }

  // handleError() {
  //   let errorMessage = '';
  //   errorMessage = `Error : user not found`
  //   console.log(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
}
