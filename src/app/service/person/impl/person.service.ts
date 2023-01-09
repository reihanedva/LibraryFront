import {IPersonInterface} from "../person.interface";
import {Injectable} from "@angular/core";
import {LibraryModel} from "../../../Model/libraryModel";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonsModel} from "../../../Model/personsModel";
import {CategoryModel} from "../../../Model/categoryModel";

@Injectable()
export class PersonService implements IPersonInterface{
  constructor(private httpClint: HttpClient){}
  url:string = 'http://192.168.10.80:8080/library/person/'
  getPerson():Observable<PersonsModel[]>{
    return this.httpClint.get<PersonsModel[]>(this.url+'getAll/')
  }
  deletePerson(id: number): Observable<void> {
    return this.httpClint.delete<void>(this.url + 'delete/' + id)
  }

  updatePerson(person : PersonsModel):Observable<void>{
    return this.httpClint.put<void>(this.url+'update/',person)
  }
  getOnePerson(id: number): Observable<PersonsModel>{
    return this.httpClint.get<PersonsModel>(this.url+'get?id=' + id)
  }
  addPerson(person : PersonsModel):Observable<void>{
    return this.httpClint.post<void>(this.url+'add',person);
  }
  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<PersonsModel[]> {
    return this.httpClint.get<PersonsModel[]>(this.url + 'getAWPAS/'+pageNum+'/'+pageSize+'/'+field)
  }
}
