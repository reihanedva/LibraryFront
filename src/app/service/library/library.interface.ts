import {LibraryModel} from "../../Model/libraryModel";
import {Observable} from "rxjs";
import {BorrowModel} from "../../Model/borrowModel";

export interface ILibraryService {
  getLibrary():Observable<LibraryModel[]>
  checkExistNum(id : number):Observable<number>
  lendingBooks(borrow : BorrowModel):Observable<BorrowModel>
  loanable(id : number):Observable<boolean>
  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<LibraryModel[]>
  AddBookToLib(lib : LibraryModel):Observable<void>
}
