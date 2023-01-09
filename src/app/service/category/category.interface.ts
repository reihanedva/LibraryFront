import {Observable} from "rxjs";
import {CategoryModel} from "../../Model/categoryModel";

export interface ICategoryInterface {
  getCategory():Observable<CategoryModel[]>
  deleteCategory(id:number):Observable<void>
  getOneCategory(id: number): Observable<CategoryModel>
  getAWPAS(pageNum:number, pageSize: number, field:string): Observable<CategoryModel[]>
}
