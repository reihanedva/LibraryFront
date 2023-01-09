import {BookModel} from "../../Model/bookModel";
import {Observable} from "rxjs";
import {HttpEvent, HttpResponse} from "@angular/common/http";

export interface IBookInterface {
  getBook():Observable<BookModel[]>
  deleteBook(id:number):Observable<void>
  updateBook(book : BookModel):Observable<void>
  getOneBook(id: number): Observable<BookModel>
  addBook(book : BookModel, id : string):Observable<void>
  downloadBook(id: number): Observable<Blob>
  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<BookModel[]>
  uploadCover(cover : File, id : number):Observable<void>
}
