import {Component, OnInit} from '@angular/core';
import {LibraryService} from "../service/library/impl/library.service";
import {LibraryModel} from "../Model/libraryModel";
import {BookService} from "../service/Book/impl/book.service";
import {BookModel} from "../Model/bookModel";
import {DomSanitizer} from "@angular/platform-browser";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import * as FileSaver from 'file-saver';
import {FilesService} from "../service/files/impl/files.service";

@Component({
  selector: 'app-library-cmp',
  templateUrl: './library-cmp.component.html',
  styleUrls: ['./library-cmp.component.css']
})
export class LibraryCMPComponent implements OnInit{
  disabled: boolean = true;
  libraryModel : LibraryModel[] = []
  AlllibraryModel : LibraryModel[] = []
  filterID : BookModel = new BookModel()
  tempShow : boolean = true
  existNum !: number
  BookList : BookModel[] = []
  BookName : string = ''
  fileUrl !: any;
  allLib: number = 0;
  pagination: number = 1;
  displayExistnum : boolean = false
  displayAdd : boolean = false
  allBook : BookModel[] = []
  addBookToLib : LibraryModel = new LibraryModel()


  reactiveFormLibrary : FormGroup = this.fb.group({
    filterID :  new FormControl(null),
    BookName :  new FormControl(null),
    existNum :  new FormControl(null, Validators.required),
    number  :  new FormControl(null, Validators.required),
    isBorrowAble :  new FormControl(false),
    BookId : new FormControl(null, Validators.required),
  })

  constructor(private fileService : FilesService,private messageService: MessageService,private fb:FormBuilder, private libraryService: LibraryService, private bookService:BookService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.getLibrary()
    this.fetchLib()
    // this.getBook()
  }



  // getBook(){
  //   this.bookService.getBook().subscribe((data)=>{
  //     this.BookList = data
  //     console.log(data)
  //   })
  // }

  getLibrary(){
    this.libraryService.getLibrary().subscribe((data)=>{
      this.AlllibraryModel = data
      this.allLib = data.length
      for (let i = 0; i<data.length; i++){
        this.BookList.push(data[i].book)
      }
      console.log(data)
    })
  }

  checkExistBook() {
    console.log(this.filterID.id)
    this.libraryService.checkExistNum(this.reactiveFormLibrary.value['filterID'].id).subscribe((data)=>{
      // this.existNum = data
      // this.BookName = this.filterID.name
      this.reactiveFormLibrary.patchValue({
        BookName: this.reactiveFormLibrary.value['filterID'].name,
        existNum: data
      })
    })
  }

  download2(id:LibraryModel){
    let temp = '6c4ead40-b134-4e85-b6ef-5beb91aa618e'
    console.log(id)
    this.fileService.downloadBook(temp).subscribe((data)=>{
      console.log(data)
    })
  }

  download(lib:LibraryModel){
    console.log(lib)
    this.bookService.downloadBook(lib.book.id).subscribe((response: Blob)=>{
      if(response.size>0){
        let blob:any = new Blob([response],  { type: 'application/' });
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        // console.log(blob)
        // console.log(url)
        // window.open(url);
        var a         = document.createElement('a');
        a.href        = url;
        a.target      = '_blank';
        a.download    = lib.book.name +'.pdf';
        document.body.appendChild(a);
        a.click();

        // setTimeout(() => {
        //   window.URL.revokeObjectURL(url);
        // }, 1000);
      }
      else {
        this.messageService.add({
          key:'showError',
          severity: 'error',
          summary: 'ERORR',
          detail: 'File Not Exists!',
        })
        // alert("File Not Exists!");
      }

      // saveAs(blob, 'employees.json');
    }), (error: any)=>{
      console.log('Error downloading the file')
    } ,  () => console.info('File downloaded successfully');
  }

  // downloadFile(item){
  //   if (item['dataObj'] != null) {
  //     let temp = item.fileName.split('.');
  //     let blob = this.base64ToBlob(item.dataObj, 'application/' + temp[temp.length - 1]);
  //     FileSaver.saveAs(blob,item.fileName + '.' + temp[temp.length - 1]);
  //   }
  // }
  //
  // base64ToBlob(b64Data, contentType, sliceSize = 512) {
  //   b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
  //   let byteCharacters = atob(b64Data);
  //   let byteArrays = [];
  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     let slice = byteCharacters.slice(offset, offset + sliceSize);
  //
  //     let byteNumbers = new Array(slice.length);
  //     for (var i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     let byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //   return new Blob(byteArrays, {type: contentType});
  // }



  onSearchLead() {
    this.reactiveFormLibrary.patchValue({
      BookName: '',
      existNum: ''
    })
  }

  renderPage(event: number) {
    console.log(event)
    this.pagination = event;
    this.fetchLib();
  }

  fetchLib() {
    console.log(this.pagination)
    this.libraryService.getAWPAS(this.pagination-1,5,'id').subscribe((data)=>{
      this.libraryModel = data
      console.log(data)
    })
  }

  showExistnum() {
    this.displayExistnum = true
  }

  showAdd() {
    this.displayAdd = true
    let tempId: number[] = []
    for(var i = 0; i < this.AlllibraryModel.length; i++){
      tempId.push(this.AlllibraryModel[i].book.id)
    }
    this.bookService.getBook().subscribe((data)=>{
      data.forEach((value) => {
        if(!tempId.includes(value.id)){
          this.allBook.push(value)
        }
      });
    })

  }

  mappingFun(bor : AbstractControl){
    // console.log(bor)
    this.addBookToLib.book.id = bor.value.BookId.id
    this.addBookToLib.existNum = bor.value.existNum
    this.addBookToLib.isBorrowAble = bor.value.isBorrowAble
    this.addBookToLib.number = bor.value.number
  }

  AddBook() {
    this.mappingFun(this.reactiveFormLibrary)
    this.libraryService.AddBookToLib(this.addBookToLib).subscribe(
      {
        next: (response) => {
          this.displayAdd = false
          this.fetchLib()
          this.getLibrary()
          // alert("Return success");
          this.messageService.add({
            key:'showError',
            severity: 'success',
            summary: 'Added',
            detail: 'Book Added successfully!',
          })
        },
        error: (error) => {
          this.displayAdd = false
          this.messageService.add({
            key:'showError',
            severity: 'error',
            summary: 'ERORR',
            detail: 'Something wrong while adding book!',
          })
        },
      }
    )
  }
}
