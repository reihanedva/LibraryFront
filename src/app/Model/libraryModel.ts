import {BookModel} from "./bookModel";
import {CategoryModel} from "./categoryModel";

export class LibraryModel {
  id !: number;
  number!:string;
  existNum!:string;
  isBorrowAble!:boolean;
  book : BookModel = new BookModel();

}
