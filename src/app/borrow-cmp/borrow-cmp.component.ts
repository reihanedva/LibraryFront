import {Component, OnInit} from '@angular/core';
import {BorrowService} from "../service/borrow/impl/borrow.service";
import {BorrowModel} from "../Model/borrowModel";
import {GlobalFunction} from "../GlobalFunction/global.function";
import {PersonService} from "../service/person/impl/person.service";
import {PersonsModel} from "../Model/personsModel";
import {BookService} from "../service/Book/impl/book.service";
import {BookModel} from "../Model/bookModel";
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
import {LibraryService} from "../service/library/impl/library.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-borrow-cmp',
  templateUrl: './borrow-cmp.component.html',
  styleUrls: ['./borrow-cmp.component.css']
})
export class BorrowCMPComponent implements OnInit{
  BorrowModel : BorrowModel[] = []
  displayBasic : boolean = false
  borrow : BorrowModel = new BorrowModel()
  tempShow : boolean = false
  allBook : BookModel[] = []
  GlobalFunction = GlobalFunction;
  tempSelectBook : boolean =false
  tempLownable : boolean = false
  errorBookName : string = ''
  allBorrow: number = 0;
  pagination: number = 1;
  reactiveFormGroup : FormGroup = this.fb.group({
    searchUser : new FormControl(null, [Validators.required]),
    fullName : new FormControl(null),
    nationalCode : new FormControl(null),
    bookID : new FormControl(null, Validators.required),
    rangeDates : new FormControl(null, Validators.required),
    filterID : new FormControl(null),
  })


  constructor(private messageService: MessageService,private fb: FormBuilder,private borrowService : BorrowService, private personService: PersonService, private bookService:BookService, private libraryService : LibraryService){}

  ngOnInit(): void {
    this.getAll()
    this.fetchBorrow()
    // console.log(new Date(2019,2,21).toLocaleDateString('fa-Ir'))
  }

  getAll(){
    this.borrowService.getAllBorrow().subscribe((data)=>{
      // for (let i = 0; i<data.length; i++){
      //   data[i].rejDate = GlobalFunction.convertDate(data[i].rejDate)
      //   //data[i].receiveDate = GlobalFunction.convertDate(data[i].receiveDate)
      // }
      // this.BorrowModel = data
      // this.reactiveFormGroup.patchValue({
      //   borrowModelList : data
      // })
      this.allBorrow = data.length
      console.log(data)
    })
  }

  showBasicDialog() {
    this.borrow = new BorrowModel()
    this.tempShow = false
    this.displayBasic = true
    // this.bookService.getBook().subscribe((data)=>{
    //   this.allBook = data
    // })
    this.libraryService.getLibrary().subscribe((data)=>{
      for (let i = 0; i<data.length; i++){
        this.allBook.push(data[i].book)
        console.log(this.allBook)
      }
    })
  }

  getPerson() {
    // console.log(this.reactiveFormGroup.value['searchUser'])
    this.personService.getOnePerson(this.reactiveFormGroup.value['searchUser']).subscribe((data)=>{
      this.reactiveFormGroup.patchValue({
        fullName : data.fullName,
        nationalCode : data.nationalCode
      })
      // this.borrow.person.id = data.id
      this.tempShow = true
      console.log(data)
    })
  }

  mappingFun(bor : AbstractControl){
    // console.log(bor)
    this.borrow.person.id = bor.value.searchUser
    this.borrow.book.id = bor.value.bookID.id
    this.borrow.receiveDate = bor.value.rangeDates[0]
    this.borrow.rejDate = bor.value.rangeDates[1]
  }

  borrowBook() {
    this.mappingFun(this.reactiveFormGroup)
    // debugger
    console.log('this.borrow',this.borrow)
    this.borrowService.lendingBooks(this.borrow).subscribe(
      {
        next: (response) => {
          console.log('this.data',response)
          this.displayBasic = false
          this.fetchBorrow()
          alert("Add success");
          this.reactiveFormGroup.patchValue({
            searchUser : '',
            fullName : '',
            nationalCode : '',
            bookID : '',
            rangeDates : '',
          })
        },
        error: (error) => {
          alert("Something wrong while borrowing book!");
        },
      }
      )
  }

  showBookOfPerson() {
    this.borrowService.getAllPerson(this.reactiveFormGroup.value['filterID']).subscribe((data)=>{
      console.log('getAllPerson',data)
      // for (let i = 0; i<data.length; i++){
      //   data[i].rejDate = GlobalFunction.convertDate(data[i].rejDate)
      //   data[i].receiveDate = GlobalFunction.convertDate(data[i].receiveDate)
      // }
      this.BorrowModel = data
      this.allBorrow = data.length
    })
  }

  reset(){
    this.fetchBorrow()
    this.reactiveFormGroup.patchValue({
      filterID : ''
    })
  }

  selectBook(value: any) {
    console.log(value)
    this.tempLownable = false
    this.errorBookName = value.name
    this.libraryService.loanable(value.id).subscribe((data)=>{
      if(data == false){
        this.tempLownable = true
        this.reactiveFormGroup.patchValue({
          bookID : '',
        })
      } else {
        this.libraryService.checkExistNum(value.id).subscribe((data)=>{
          if(data<1){
            this.tempLownable = true
            this.reactiveFormGroup.patchValue({
              bookID : '',
            })
          }
        })
      }
    })
  }

  return(id : number) {
    this.borrowService.Returnbooks(id).subscribe(
      {
        next: (response) => {
          this.fetchBorrow()
          // alert("Return success");
          this.messageService.add({
            key:'showError',
            severity: 'success',
            summary: 'ERORR',
            detail: 'Return success!',
          })
        },
        error: (error) => {
          this.messageService.add({
            key:'showError',
            severity: 'error',
            summary: 'ERORR',
            detail: 'Something wrong while returning book!',
          })
          // alert("Something wrong while returning book!");
        },
      }
    )
  }

  renderPage(event: number) {
    console.log(event)
    this.pagination = event;
    this.fetchBorrow();
  }

  fetchBorrow() {
    console.log(this.pagination)
    this.borrowService.getAWPAS(this.pagination-1,5,'id').subscribe((data)=>{
      this.BorrowModel = data
      console.log(data)
    })
  }
}
