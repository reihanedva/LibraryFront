import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../service/category/impl/category.service";
import {PersonService} from "../service/person/impl/person.service";
import {PersonsModel} from "../Model/personsModel";
import {CategoryModel} from "../Model/categoryModel";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-person-cmp',
  templateUrl: './person-cmp.component.html',
  styleUrls: ['./person-cmp.component.css']
})
export class PersonCMPComponent implements OnInit{

  personList : PersonsModel[] = []
  displayBasic: boolean = false
  displayAdd: boolean = false
  editPerson : PersonsModel = new PersonsModel()
  addPerson : PersonsModel = new PersonsModel()
  filterString : string = ''
  allPerson: number = 0;
  pagination: number = 1;
  constructor(private messageService: MessageService,private personService: PersonService, private fb: FormBuilder){}

  reactiveFormPerson : FormGroup = this.fb.group({
    id :  new FormControl(null),
    firstName : new FormControl(null, [Validators.required]),
    lastName : new FormControl(null, [Validators.required]),
    nationalCode : new FormControl(null, [Validators.required]),
    filterString :  new FormControl(null)
  })

  get nationalCode() { return this.reactiveFormPerson.get('nationalCode'); }

  ngOnInit(): void {
    this.getCategory()
    this.fetchPerson()
  }

  getCategory(){
    this.personService.getPerson().subscribe((data)=>{
      // this.personList = data
      // console.log(data)
      this.allPerson = data.length
    })
  }

  delete(id: number) {
    this.personService.deletePerson(id).subscribe(
      {
        next: (response) => {
          this.fetchPerson()
          alert("Delete success");
          console.log(response)
        },
        error: (error) => {
          this.messageService.add({
            key:'showError',
            severity: 'error',
            summary: 'ERORR',
            detail: 'This Person cannot be deleted!',
          })
          // alert("This Person cannot be deleted!");
          console.log(error)
        },
      }
    )
  }

  showBasicDialog(person :PersonsModel) {
    this.personService.getOnePerson(person.id).subscribe((data)=>{
      let x = data.fullName.split(" ");
      this.reactiveFormPerson.patchValue({
        firstName : x[0],
        lastName : x[1],
        nationalCode : data.nationalCode,
        id : data.id
      })
      // data.firstName = x[0]
      // data.lastName = x[1]
      this.displayBasic = true;
      // this.editPerson = data
    })
  }

  updatePersonFunc(person: PersonsModel) {
    // console.log(person)
    this.mappingFun(this.reactiveFormPerson.value)
    this.personService.updatePerson(this.editPerson).subscribe(
      {
        next: (response) => {
          this.displayBasic = false
          this.fetchPerson()
          // alert("Update success");
          this.messageService.add({
            key:'showError',
            severity: 'success',
            summary: 'Updated',
            detail: 'Updated Successfully!',
          })
          this.reset()
        },
        error: (error) => {
          this.messageService.add({
            key:'showError',
            severity: 'error',
            summary: 'ERORR',
            detail: 'Something wrong while updating this person!',
          })
          // alert("Something wrong while updating this person!");
        },
      }
    )
  }

  addPersonFunc() {
    this.mappingFun(this.reactiveFormPerson.value)
    console.log(this.editPerson)
    this.personService.addPerson(this.editPerson).subscribe(
      {
        next: (response) => {
          this.fetchPerson()
          // alert("Add success");
          this.messageService.add({
            key:'showError',
            severity: 'success',
            summary: 'Added',
            detail: 'Added Successfully!',
          })
          this.displayAdd = false
          this.reset()
        },
        error: (error) => {
          this.messageService.add({
            key:'showError',
            severity: 'error',
            summary: 'ERORR',
            detail: 'Something wrong while Adding this person!!',
          })
          // alert("Something wrong while Adding this person!");
        },
      })
  }

  mappingFun(person : any){
    console.log(person )
    if(person.id){
      this.editPerson.id = person.id
      console.log('person',person)
    }
    this.editPerson.firstName = person.firstName
    this.editPerson.lastName = person.lastName
    this.editPerson.nationalCode = person.nationalCode
  }

  reset(){
    this.reactiveFormPerson.patchValue({
      firstName : '',
      lastName : '',
      nationalCode : ''
    })
  }

  showAddDialog() {
    this.displayAdd = true
  }

  renderPage(event: number) {
    console.log(event)
    this.pagination = event;
    this.fetchPerson();
  }

  fetchPerson() {
    console.log(this.pagination)
    this.personService.getAWPAS(this.pagination-1,5,'firstName').subscribe((data)=>{
      this.personList = data
      // console.log(data)
    })
  }
}
