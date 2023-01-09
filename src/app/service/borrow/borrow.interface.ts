import {BorrowModel} from "../../Model/borrowModel";
import {Observable} from "rxjs";
import {PersonsModel} from "../../Model/personsModel";

export interface IBorrowInterface {
  getAllBorrow(): Observable<BorrowModel[]>
  getAllPerson(person : number): Observable<BorrowModel[]>
  addBorrow(borrow : BorrowModel): Observable<void>
  searchPerson(id: number): Observable<PersonsModel>
  lendingBooks(borrow : BorrowModel):Observable<BorrowModel>
  Returnbooks(id : number):Observable<boolean>
  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<BorrowModel[]>
}
