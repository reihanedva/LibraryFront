import {ILibraryService} from "../library.interface";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LibraryModel} from "../../../Model/libraryModel";
import {BorrowModel} from "../../../Model/borrowModel";
import {BookModel} from "../../../Model/bookModel";

@Injectable()
export class LibraryService implements ILibraryService{
 constructor(private httpClint: HttpClient){}
 url:string = 'http://192.168.10.80:8080/library/library/'
  getLibrary():Observable<LibraryModel[]>{
    return this.httpClint.get<LibraryModel[]>(this.url+'getAll/')
  }
  checkExistNum(id : number):Observable<number>{
    return this.httpClint.get<number>(this.url + 'checkExistNum/' + id)
  }
  lendingBooks(borrow : BorrowModel):Observable<BorrowModel>{
   return this.httpClint.post<BorrowModel>(this.url + 'lendingBooks/' , borrow)
  }
  loanable(id : number):Observable<boolean>{
    return this.httpClint.get<boolean>(this.url + 'loanable/' + id)
  }
  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<LibraryModel[]> {
    return this.httpClint.get<LibraryModel[]>(this.url + 'getAWPAS/'+pageNum+'/'+pageSize+'/'+field)
  }
  AddBookToLib(lib : LibraryModel):Observable<void>{
   return this.httpClint.post<void>(this.url+'add',lib)
  }
}
