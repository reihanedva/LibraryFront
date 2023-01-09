import {BookModel} from "./bookModel";
import {PersonsModel} from "./personsModel";

export class BorrowModel {
  book : BookModel = new BookModel();
  person : PersonsModel = new PersonsModel();
  receiveDate !: string;
  rejDate !: string;
  id !: number;
}
