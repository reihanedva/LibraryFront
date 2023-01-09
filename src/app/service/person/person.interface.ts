import {PersonsModel} from "../../Model/personsModel";
import {Observable} from "rxjs";

export interface IPersonInterface {
  getPerson():Observable<PersonsModel[]>
  getOnePerson(id: number): Observable<PersonsModel>
  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<PersonsModel[]>
  deletePerson(id: number): Observable<void>
  updatePerson(person : PersonsModel):Observable<void>
  addPerson(person : PersonsModel):Observable<void>
}
