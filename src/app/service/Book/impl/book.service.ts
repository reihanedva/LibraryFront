import {IBookInterface} from "../book.interface";
import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import {LibraryModel} from "../../../Model/libraryModel";
import {Observable} from "rxjs";
import {BookModel} from "../../../Model/bookModel";
import {PersonsModel} from "../../../Model/personsModel";
import {CategoryModel} from "../../../Model/categoryModel";

@Injectable()
export class BookService implements IBookInterface{
  constructor(private httpClint: HttpClient){}
  url:string = 'http://192.168.10.80:8080/library/book/'
  //url:string = 'https://apitester.ir/api/Categories'

  getBook():Observable<BookModel[]>{
    return this.httpClint.get<BookModel[]>(this.url+'getAll')
  }
  deleteBook(id:number):Observable<void>{
    return this.httpClint.delete<void>(this.url+'delete/'+id)
  }

  updateBook(book : BookModel):Observable<void>{
    return this.httpClint.put<void>(this.url+'update/',book)
  }

  getOneBook(id: number): Observable<BookModel>{
    return this.httpClint.get<BookModel>(this.url+'get?id=' + id)
  }
  addBook(book : BookModel, id : string):Observable<void>{
    return this.httpClint.post<void>(this.url+'add/'+id,book);
  }

  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<BookModel[]> {
    return this.httpClint.get<BookModel[]>(this.url + 'getAWPAS/'+pageNum+'/'+pageSize+'/'+field)
  }

  uploadCover(cover : File, id : number):Observable<void>{
      const formData = new FormData();
      formData.append("cover", cover,cover.name);
    return this.httpClint.post<void>(this.url+'uploadCover/'+id,formData)
  }

  // uploadCover(cover: File[], book:BookModel):Observable<HttpEvent<any>>{
  //   const formData = new FormData();
  //   formData.append("cover", cover[0]);
  //   formData.append("file", cover[1]);
  //   formData.append("book", new Blob([JSON.stringify(book)],{
  //             type: 'application/json',
  //           }))
  //
  //   // let headers = new HttpHeaders();
  //   // headers = headers.append('Content-Type', 'multipart/form-data');
  //   // headers = headers.append('enctype', 'multipart/form-data');
  //
  //   // let headers = new HttpHeaders();
  //   // headers = headers.append('Content-Type', 'multipart/form-data');
  //   // headers = headers.append('enctype', 'multipart/form-data');
  //   return this.httpClint.post<HttpEvent<any>>(this.url+'uploadCover&File',formData,{})
  // }

  downloadBook(id: number): Observable<Blob>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});
    return this.httpClint.get<Blob>(this.url+'downloadFile?id=' + id,{})
  }


}
