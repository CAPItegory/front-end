import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CapitegoryService } from '../service/capitegory.service';
import { Category } from '../entity/category.entity';
import { PopupService } from '../service/popup.service';
import { ServerError } from '../exceptions/server.exception';
import { BadRequestError } from '../exceptions/bad-request.exception';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss'
})
export class CategoryManagementComponent {
  @Input() parentId: string | null = null
  @Input() editMode: boolean = false
  @Input() categoryId: string |null = null

  @Output() hiddenChange: EventEmitter<boolean> = new EventEmitter()
  @Output() categoryChange: EventEmitter<boolean> = new EventEmitter()

  parentCategory: Category | null = null

  possibleParents: Category[] = []

  constructor(private capitegoryService: CapitegoryService, private popupService: PopupService) {}

  categoryForm = new FormGroup({
      name : new FormControl(''),
      parents : new FormControl('')
  });

  parents: Category[] | null = null

  async ngOnInit() {
    if (this.editMode) {
      try {
        this.possibleParents = await this.capitegoryService.getAll();
      }
      catch(error) {
       this.manageError(error)
        return;
      }
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.loadCategory(changes['parentId']?.currentValue)
  }

  manageCategory(): void {
    if (this.editMode) {
      this.editCategory()
    } else {
      this.createCategory()
    }
  }



  async createCategory(): Promise<void> {
    this.hiddenChange.emit(true);
    try {
      await this.capitegoryService.create(this.categoryForm.value.name ?? "", this.parentId);
    }
    catch(error) {
      if(error instanceof ServerError) {
        this.popupService.openError(error.message)
      } else if(error instanceof BadRequestError) {
        this.popupService.openWarning(error.message)
      }
      return;
    }
    this.categoryForm.reset();
    this.categoryChange.emit(true);
    this.popupService.openSuccess("Your new category has been successfully created")
  }




  async editCategory(): Promise<void> {
    this.hiddenChange.emit(true);
    try {
      let name = this.categoryForm.value.name;
      let parent = this.categoryForm.value.parents;
      await this.capitegoryService.update(this.categoryId ?? "", 
        name == "" || name == undefined ? null : name, 
        parent == "" ? null : parent == "no_parent" ? "" : parent)
    }
    catch(error) {
      if(error instanceof ServerError) {
        this.popupService.openError(error.message)
      } else if(error instanceof BadRequestError) {
        this.popupService.openWarning(error.message)
      }
      return;
    }
    this.categoryChange.emit(true);
    this.categoryForm.reset();
    this.popupService.openSuccess("Your category has been successfully edited")
  }



  hidePopup(): void {
    this.hiddenChange.emit(true)
  }

  private manageError(error: unknown) {
    if(error instanceof ServerError) {
      this.popupService.openError(error.message)
    } else if(error instanceof BadRequestError) {
      this.popupService.openWarning(error.message)
    }
  }

  private async loadCategory(id: string) {
    if (id != null) {
      try {
      this.parentCategory = await this.capitegoryService.getById(id);
      }
      catch(error) {
        this.manageError(error)
        return;
      }
    }
  }
}
