import { Pipe, PipeTransform } from '@angular/core';
import {PersonsModel} from "./Model/personsModel";

@Pipe({
  name: 'filterPerson'
})
export class FilterPersonPipe implements PipeTransform {

  transform(value: any[],filterStr?: string): PersonsModel[] {
    if(!filterStr)
      return value;
    // return value.filter(f=> f["productId"] == filterStr)

    return value.filter(f=>f['name'].toLowerCase().includes(filterStr))
  }
}
