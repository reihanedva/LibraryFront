import { Pipe, PipeTransform } from '@angular/core';
import {BookModel} from "./Model/bookModel";
import {PersonsModel} from "./Model/personsModel";

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform<T>(value: T[] , filterStr?: string,fieldName?:string): T[] {
    if(!filterStr)
      return value;
    // return value.filter(f=> f["productId"] == filterStr)
    // @ts-ignore
    return value.filter(f=>f[fieldName]?.toLowerCase().includes(filterStr))
  }
}
