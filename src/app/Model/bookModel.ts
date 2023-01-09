import {CategoryModel} from "./categoryModel";
import {FileModel} from "./fileModel";

export class BookModel {
  id !: number;
  name!:string;
  shabak!:number;
  printData!:string;
  category : CategoryModel = new CategoryModel();
  cover !: string;
  fileBook : FileModel = new FileModel();
}
