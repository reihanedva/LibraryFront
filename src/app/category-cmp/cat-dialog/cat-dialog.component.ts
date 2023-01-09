import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {CategoryService} from "../../service/category/impl/category.service";
import {CategoryModel} from "../../Model/categoryModel";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cat-dialog',
  templateUrl: './cat-dialog.component.html',
  styleUrls: ['./cat-dialog.component.css']
})
export class CatDialogComponent implements OnChanges{

  @Input() showUpdate : object = {}
  @Output() cancelBtn = new EventEmitter<void>()
  displayBasic: boolean = false
  editCategory : CategoryModel = new CategoryModel()
  type : string = ''
  dialogTitle: string = ''

  reactiveFormPerson : FormGroup = this.fb.group({
    name : new FormControl(null, [Validators.required]),
    id : new FormControl(null),
  })

  constructor(private messageService: MessageService,private categoryService: CategoryService,private fb: FormBuilder){}

  ngOnChanges(changes: SimpleChanges): void {
    this.editCategory = new CategoryModel()
    let update = Object.values(this.showUpdate)
    if(update[0]){
      this.type = update[1]
      if(this.type == 'ADD'){
        this.displayBasic = true;
        this.dialogTitle = 'ADD'
      } else {
        this.categoryService.getOneCategory(update[0].id).subscribe((data)=>{
          this.displayBasic = true;
          this.reactiveFormPerson.patchValue({
            name : data.name,
            id: data.id
          })
          // this.editCategory = data
          this.dialogTitle = 'UPDATE'
        })
      }
    }
  }

  mappingFun(cat : any){
    // console.log(bor)
    if (cat.id){
      this.editCategory.id = cat.id
    }
    this.editCategory.name = cat.name
  }

  resetData(){
    this.reactiveFormPerson.patchValue({
      name : '',
      id : '',
    })
  }

  updateCatFunc(){
    this.mappingFun(this.reactiveFormPerson.value)
    this.displayBasic = false;
    if(this.type == 'ADD'){
      this.categoryService.addCategory(this.editCategory).subscribe(
        {
          next: (response) => {
            this.cancelBtn.emit();
            // alert("Add success");
            this.resetData()
            this.messageService.add({
              key:'showError',
              severity: 'success',
              summary: 'Added',
              detail: 'Category Added successfully!',
            })
          },
          error: (error) => {
            this.resetData()
            this.messageService.add({
              key:'showError',
              severity: 'error',
              summary: 'ERORR',
              detail: 'Something wrong while Adding this Category!',
            })
            // alert("Something wrong while Adding this Category!");
          },
        }
        )
    } else {
      this.categoryService.updateCategory(this.editCategory).subscribe(
        {
          next: (response) => {
            this.cancelBtn.emit();
            this.resetData()
            this.messageService.add({
              key:'showError',
              severity: 'success',
              summary: 'Updated',
              detail: 'Category Updated successfully!',
            })
          },
          error: (error) => {
            this.resetData()
            this.messageService.add({
              key:'showError',
              severity: 'error',
              summary: 'ERORR',
              detail: 'Something wrong while Updating this Category!',
            })
            // alert("Something wrong while Updating this Category!");
          },
        })
    }
  }
}
