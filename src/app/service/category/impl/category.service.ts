import {ICategoryInterface} from "../category.interface";
import {CategoryModel} from "../../../Model/categoryModel";
import {LibraryModel} from "../../../Model/libraryModel";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class CategoryService implements ICategoryInterface {
  constructor(private httpClint: HttpClient) {
  }

  url: string = 'http://192.168.10.80:8080/library/category/'

  getCategory(): Observable<CategoryModel[]> {
    return this.httpClint.get<CategoryModel[]>(this.url + 'getAll')
  }

  deleteCategory(id: number): Observable<void> {
    return this.httpClint.delete<void>(this.url + 'delete/' + id)
  }

  updateCategory(cat : CategoryModel):Observable<void>{
    return this.httpClint.put<void>(this.url+'update/',cat)
  }
  addCategory(cat : CategoryModel):Observable<void>{
    return this.httpClint.post<void>(this.url+'add/',cat);
  }
  getOneCategory(id: number): Observable<CategoryModel>{
    return this.httpClint.get<CategoryModel>(this.url+'get/' + id)
  }

  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<CategoryModel[]> {
    return this.httpClint.get<CategoryModel[]>(this.url + 'getAWPAS/'+pageNum+'/'+pageSize+'/'+field)
  }
}
