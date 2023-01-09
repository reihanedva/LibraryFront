import {IFilesInterface} from "../files.interface";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileModel} from "../../../Model/fileModel";
import {BookModel} from "../../../Model/bookModel";
@Injectable()
export class FilesService implements IFilesInterface{
  constructor(private httpClint : HttpClient){}
  url:string = 'http://192.168.10.80:8080/library/file/'

  downloadBook(id: string): Observable<FileModel>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});
    return this.httpClint.get<FileModel>(this.url+'download/' + id,{headers : headers,responseType: 'blob' as 'json'})
  }
  upload(cover: any): Observable<FileModel>{
    const formData = new FormData();
    console.log(cover)
    formData.append("file", cover,cover.name);
    return this.httpClint.post<FileModel>(this.url+'upload',formData)
  }
  getAllFile():Observable<FileModel[]>{
    return this.httpClint.get<FileModel[]>(this.url+'files')
  }

  getPDFFile(id : string): Observable<Blob>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});
    return this.httpClint.get<Blob>(this.url+'files/'+id,{headers : headers,responseType: 'blob' as 'json'})
  }
}
