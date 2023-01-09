import { Component } from '@angular/core';
import {LibraryService} from "../service/library/impl/library.service";
import {BookService} from "../service/Book/impl/book.service";
import {BookModel} from "../Model/bookModel";
import {CategoryModel} from "../Model/categoryModel";
import {CategoryService} from "../service/category/impl/category.service";
import {GlobalFunction} from "../GlobalFunction/global.function";
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {FilesService} from "../service/files/impl/files.service";

@Component({
  selector: 'app-book-cmp',
  templateUrl: './book-cmp.component.html',
  styleUrls: ['./book-cmp.component.css']
})
export class BookCMPComponent {
  constructor(private fileService:FilesService, private messageService: MessageService, private bookService: BookService, private categoryService:CategoryService, private fb:FormBuilder){}

  reactiveFormBook : FormGroup = this.fb.group({
    bookName :  new FormControl(null, Validators.required),
    shabak :  new FormControl(null, Validators.required),
    printData :  new FormControl(null, Validators.required),
    category :  new FormControl(null, Validators.required),
    addFileId : new FormControl(null, Validators.required),
  })

  allBooks: number = 0;
  pagination: number = 1;
  BookModel=BookModel;
  bookList : BookModel[] = []
  updateBook : BookModel = new BookModel()
  displayBasic: boolean = false;
  displayBasic2: boolean = false;
  displayImage : boolean = false
  editBook : BookModel = new BookModel()
  addBook : BookModel = new BookModel()
  displayAdd : boolean = false
  categoryModelList : CategoryModel[] = []
  filterString : string = ''
  tempData !: string
  displayFile : boolean = false
  GlobalFunction = GlobalFunction
  fileS : boolean = false
  fileF : boolean = false
  /////////////
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;

  selectedPDFFiles?: FileList;
  currentPDFFile?: File;
  progressPDF = 0;
  messagePDF = '';
  previewPDF = '';

  setPic : BookModel = new BookModel()
  ///////////////


  ngOnInit(): void {
    this.getBook()
    this.fetchBooks()
    // var d = new Date();
    // console.info(d.toLocaleDateString("fa-IR"))
  }

  getBook(){
    this.bookService.getBook().subscribe((data)=>{
      // this.bookList = data
      this.allBooks = data.length
      console.log(data)
    })
  }

  update(book : BookModel) {
    if(book.printData.length){
      book.printData = this.tempData
    }
    this.bookService.updateBook(book).subscribe(
      {
        next: (response) => {
          this.displayBasic = false
          // alert("Update success");
          this.messageService.add({
            key:'showError',
            severity: 'success',
            summary: 'Update',
            detail: 'successfully updated!',
          })
          this.fetchBooks()
        },
        error: (error) => {
          this.messageService.add({
            key:'showError',
            severity: 'error',
            summary: 'ERORR',
            detail: 'Something wrong while updating book!',
          })
          // alert("Something wrong while updating book!");
        },
      }

     )
  }

  delete(bookID : number){
    console.log(bookID)
    this.bookService.deleteBook(bookID).subscribe(
      {
        next: (response) => {
          this.fetchBooks()
          alert("Delete success");
          console.log(response)
        },
        error: (error) => {
          alert("This Book cannot be deleted!");
          console.log(error)
        },
      }
    )
  }

  showBasicDialog(book :BookModel) {
    console.log('befor',book)
    this.categoryService.getCategory().subscribe((data)=>{
      this.categoryModelList = data
    })
    this.bookService.getOneBook(book.id).subscribe((data)=>{
      this.displayBasic = true;
      this.tempData = data.printData
      data.printData = GlobalFunction.convertDate(data.printData)
      this.editBook = data
      console.log(data)
    })
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  mappingFun(book : AbstractControl){
    // console.log(bor)
    this.addBook.name = book.value.bookName
    this.addBook.shabak = book.value.shabak
    this.addBook.category = book.value.category
    this.addBook.printData = book.value.printData
  }

  addBookFunc() {
    // console.log(this.reactiveFormBook.value)
    this.mappingFun(this.reactiveFormBook)
    this.bookService.addBook(this.addBook, this.reactiveFormBook.value['addFileId']).subscribe(
      {
        next: (response) => {
          this.displayAdd = false
          this.fetchBooks()
          alert("Add success");
          this.addBook = new BookModel()
        },
        error: (error) => {
          alert("Something wrong while Adding this book!");
        },
      }
      )
  }

  showAddDialog() {
    this.displayAdd = true
    this.categoryService.getCategory().subscribe((data)=>{
      this.categoryModelList = data
    })
  }
  file(book : BookModel){
    this.displayFile = true
    this.setPic = book
  }

  renderPage(event: number) {
    console.log(event)
    this.pagination = event;
    this.fetchBooks();
  }

  fetchBooks() {
    console.log(this.pagination)
    this.bookService.getAWPAS(this.pagination-1,5,'id').subscribe((data)=>{
      this.bookList = data
      console.log(data)
    })
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    console.log(event.target.files[0])

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  selectFilePDF(event: any): void {
    this.messagePDF = '';
    this.previewPDF = '';
    this.progressPDF = 0;
    this.selectedPDFFiles = event.target.files;

    if (this.selectedPDFFiles) {
      const file: File | null = this.selectedPDFFiles.item(0);

      if (file) {
        this.previewPDF = '';
        this.currentPDFFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.previewPDF = e.target.result;
        };

        reader.readAsDataURL(this.currentPDFFile);
      }
    }
  }

  uploadFile(): void {
    this.progress = 0;
    console.log(this.selectedPDFFiles)
    let temp = []

    if (this.selectedPDFFiles) {
      const filePDF: File | null = this.selectedPDFFiles.item(0);

      if (filePDF)
        this.currentPDFFile = filePDF
        // temp[0] = this.currentPDFFile
        this.fileService.upload(this.currentPDFFile).subscribe(
          {
            next: (data) => {
              console.log('response', data)
              this.fileService.getAllFile().subscribe((data)=>{
                for(let i = 0; i<data.length; i++){
                  if(data[i].name  == this.currentPDFFile!.name){
                    this.setPic.fileBook.id = data[i].id
                  }
                }
                this.bookService.updateBook(this.setPic).subscribe((data)=>{
                  this.setPic = new BookModel()
                })
              })

              this.fetchBooks()
              this.messageService.add({
                key:'showError',
                severity: 'success',
                summary: 'Uploaded',
                detail: 'Upload files Successfully!',
              })
              this.displayFile = false
            },
            error: (error) => {
              this.messageService.add({
                key:'showError',
                severity: 'error',
                summary: 'ERORR',
                detail: 'Something wrong while uploading files!',
              })
              this.displayFile = false
            },
          })
      }
      this.selectedPDFFiles = undefined
    }

  cover(book : BookModel){
    this.displayImage = true
    this.setPic = book
  }
  // upload(): void {
  //   this.progress = 0;
  //   console.log(this.selectedFiles)
  //   console.log(this.selectedPDFFiles)
  //   let temp = []
  //
  //   if (this.selectedFiles && this.selectedPDFFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     const filePDF: File | null = this.selectedPDFFiles.item(0);
  //
  //     if (file && filePDF) {
  //       this.currentFile = file;
  //       this.currentPDFFile = filePDF
  //       temp[0] = this.currentFile
  //       temp[1] = this.currentPDFFile
  //       this.bookService.uploadCover(temp, this.setPic).subscribe(
  //         {
  //           next: (response) => {
  //             this.fetchBooks()
  //             // alert("Add success");
  //             this.messageService.add({
  //               key:'showError',
  //               severity: 'success',
  //               summary: 'Uploaded',
  //               detail: 'Upload files Successfully!',
  //             })
  //             this.displayFile = false
  //           },
  //           error: (error) => {
  //             this.messageService.add({
  //               key:'showError',
  //               severity: 'error',
  //               summary: 'ERORR',
  //               detail: 'Something wrong while uploading files!',
  //             })
  //             this.displayFile = false
  //             // alert("Something wrong while Adding this person!");
  //           },
  //         })
  //       // {
  //       //   next: (event: any) => {
  //       //     console.log(event)
  //       //     if (event.type === HttpEventType.UploadProgress) {
  //       //       this.progress = Math.round((100 * event.loaded) / event.total);
  //       //     } else if (event instanceof HttpResponse) {
  //       //       this.message = event.body.message;
  //       //
  //       //       // this.imageInfos = this.bookService.getFiles();
  //       //     }
  //       //   },
  //       //   error: (err: any) => {
  //       //     console.log(err);
  //       //     this.progress = 0;
  //       //
  //       //     if (err.error && err.error.message) {
  //       //       this.message = err.error.message;
  //       //     } else {
  //       //       this.message = 'Could not upload the image!';
  //       //     }
  //       //
  //       //     this.currentFile = undefined;
  //       //   },
  //       // });
  //     }
  //
  //     this.selectedFiles = undefined
  //     this.selectedPDFFiles = undefined
  //   }
  // }

  uploadImage() {
      console.log(this.selectedFiles)
      let temp = []

      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);

        if (file) {
          this.currentFile = file;
          this.bookService.uploadCover(this.currentFile, this.setPic.id).subscribe(
            {
              next: (data) => {
                console.log(data)
                this.fetchBooks()
                // alert("Add success");
                this.setPic = new BookModel()
                this.messageService.add({
                  key:'showError',
                  severity: 'success',
                  summary: 'Uploaded',
                  detail: 'Upload files Successfully!',
                })
                this.displayImage = false
              },
              error: (error) => {
                this.setPic = new BookModel()
                this.messageService.add({
                  key:'showError',
                  severity: 'error',
                  summary: 'ERORR',
                  detail: 'Something wrong while uploading files!',
                })
                this.displayImage = false
                // alert("Something wrong while Adding this person!");
              },
            })
        }
        this.selectedFiles = undefined
      }
  }

  addFile() {
    this.progress = 0;
    console.log(this.selectedPDFFiles)
    let temp = []

    if (this.selectedPDFFiles) {
      const filePDF: File | null = this.selectedPDFFiles.item(0);

      if (filePDF)
        this.currentPDFFile = filePDF
      // temp[0] = this.currentPDFFile
      this.fileService.upload(this.currentPDFFile).subscribe(
        {
          next: (data) => {
            console.log('response', data)
            this.fileService.getAllFile().subscribe((data)=>{
              for(let i = 0; i<data.length; i++){
                if(data[i].name  == this.currentPDFFile!.name){
                  this.reactiveFormBook.patchValue({
                    addFileId : data[i].id
                  })
                }
              }
            })
            this.fileS = true
            // this.messageService.add({
            //   key:'showError',
            //   severity: 'success',
            //   summary: 'Uploaded',
            //   detail: 'Upload file Successfully!',
            // })
          },
          error: (error) => {
            this.fileF = true
            // this.messageService.add({
            //   key:'showError',
            //   severity: 'error',
            //   summary: 'ERORR',
            //   detail: 'Something wrong while uploading file!',
            // })
          },
        })
    }
    this.selectedPDFFiles = undefined
  }
  download(book : BookModel){
    console.log(book)
    this.fileService.getPDFFile(book.fileBook.id).subscribe((response)=>{
      console.log(response)
      if(response.size>0){
        let blob:any = new Blob([response],  { type: 'application/pdf' });
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        console.log(blob)
        // console.log(url)
        // window.open(url);
        var a         = document.createElement('a');
        a.href        = url;
        a.target      = '_blank';
        a.download    = book.name +'.pdf';
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
    })
  }
}
