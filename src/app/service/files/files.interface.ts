import {Observable} from "rxjs";
import {FileModel} from "../../Model/fileModel";

export interface IFilesInterface {
  downloadBook(id: string): Observable<FileModel>
  upload(cover: any): Observable<FileModel>
  getAllFile():Observable<FileModel[]>
  getPDFFile(id : string): Observable<Blob>
}
