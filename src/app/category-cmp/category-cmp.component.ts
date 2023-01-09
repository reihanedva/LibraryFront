import { Component } from '@angular/core';
import {BookService} from "../service/Book/impl/book.service";
import {BookModel} from "../Model/bookModel";
import {CategoryService} from "../service/category/impl/category.service";
import {CategoryModel} from "../Model/categoryModel";

@Component({
  selector: 'app-category-cmp',
  templateUrl: './category-cmp.component.html',
  styleUrls: ['./category-cmp.component.css']
})
export class CategoryCMPComponent {
  constructor(private categoryService: CategoryService){}

  updateModel: object = {}
  tempReload : boolean = false

  getCancelBtn() {
    this.updateModel = new CategoryModel()
    this.tempReload = true
  }

  getUpdateCate(event: any) {
    // console.log(event)
    this.tempReload = false
    this.updateModel = event
  }



  // categoryList : CategoryModel[] = []
  // updatecategory : CategoryModel = new CategoryModel()
  // displayBasic: boolean = false
  // editCategory : CategoryModel = new CategoryModel()
  // addCat : CategoryModel = new CategoryModel()
  // displayAdd: boolean = false
  // ngOnInit(): void {
  //   this.getCategory()
  // }
  //
  //
  // getCategory(){
  //   this.categoryService.getCategory().subscribe((data)=>{
  //     this.categoryList = data
  //     console.log(data)
  //   })
  // }
  //
  // delete(bookID : number){
  //   console.log(bookID)
  //   this.categoryService.deleteCategory(bookID).subscribe((data)=>{
  //       this.getCategory()
  //       alert("Delete success");
  //     })
  // }
  //
  // updateCatFunc(cat : CategoryModel){
  //   console.log(cat)
  //   this.displayBasic = false;
  //   this.categoryService.updateCategory(cat).subscribe((data)=>{
  //     alert("update success");
  //     this.getCategory()
  //   })
  // }
  //
  // showBasicDialog(cat :CategoryModel) {
  //   this.categoryService.getOneCategory(cat.id).subscribe((data)=>{
  //     console.log('cat',cat)
  //     this.displayBasic = true;
  //     this.editCategory = data
  //   })
  //   // this.editCategory = cat
  // }
  //
  // addCategory(cat : CategoryModel){
  //   this.categoryService.addCategory(cat).subscribe((data)=>{
  //     alert("add success");
  //     this.getCategory()
  //     this.addCat = new CategoryModel()
  //     this.displayAdd = false
  //   })
  // }
  //
  // showAddDialog() {
  //   this.displayAdd = true
  // }

}
