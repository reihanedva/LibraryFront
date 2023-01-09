import {Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input} from '@angular/core';
import {CategoryService} from "../../service/category/impl/category.service";
import {CategoryModel} from "../../Model/categoryModel";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit, OnChanges{

  categoryList : CategoryModel[] = []
  allStudents: number = 0;
  pagination: number = 1;
  @Output() updateCat = new EventEmitter<{Cat: CategoryModel, Type: string}>()
  @Input() reload : boolean = false

  constructor(private messageService: MessageService,private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getCategory()
    this.fetchCategory()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.reload == true){
      this.getCategory()
      this.fetchCategory()
    }
  }

  getCategory(){
    this.categoryService.getCategory().subscribe((data)=>{
      // this.categoryList = data
      this.allStudents = data.length
      console.log(data)
    })
  }

  showBasicDialog(cat: CategoryModel) {
    let type = 'UPDATE'
    this.Dialog(cat,type)
  }

  delete(catID : number){
    this.categoryService.deleteCategory(catID).subscribe(
      {
        next: (response) => {
          this.fetchCategory()
          this.messageService.add({
            key:'showError',
            severity: 'success',
            summary: 'Delete',
            detail: 'Category Deleted successfully!',
          })
          console.log(response)
        },
        error: (error) => {
          this.messageService.add({
            key:'showError',
            severity: 'error',
            summary: 'ERORR',
            detail: 'This Category cannot be deleted!',
          })
          // alert("This Category cannot be deleted!");
          // console.log(error)
        },
      }
    )
  }

  showAddDialog() {
    let addModel = new CategoryModel()
    let type = 'ADD'
    this.Dialog(addModel,type)
  }

  Dialog(cat: CategoryModel,type: string){
    this.updateCat.emit({Cat:cat, Type:type})
  }

  renderPage(event: number) {
    console.log(event)
    this.pagination = event;
    this.fetchCategory();
  }

  fetchCategory() {
    console.log(this.pagination)
    this.categoryService.getAWPAS(this.pagination-1,5,'id').subscribe((data)=>{
      this.categoryList = data
      console.log(data)
    })
  }
}
