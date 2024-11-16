import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CapitegoryService } from '../service/capitegory.service';
import { Category } from '../entity/category.entity';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  @Input() parentId: string | null = null
  @Input() editMode: boolean = false
  @Input() categoryId: string |null = null

  @Output() hiddenChange: EventEmitter<boolean> = new EventEmitter()

  parentCategory: Category | null = null

  possibleParents: Category[] = []

  constructor(private capitegoryService: CapitegoryService) {}

  categoryForm = new FormGroup({
      name : new FormControl(''),
      parents : new FormControl('')
  });

  parents: Category[] | null = null

  async ngOnInit() {
    if (this.parentId != null) {
      this.parentCategory = await this.capitegoryService.getById(this.parentId);
    }
    if (this.editMode) {
      this.possibleParents = await this.capitegoryService.getAll();
    }
  }

  manageCategory(): void {
    if (this.editMode) {
      this.editCategory()
    } else {
      this.createCategory()
    }
  }

  createCategory(): void {
    this.capitegoryService.create(this.categoryForm.value.name ?? "", this.parentId);
    this.categoryForm.reset();
    window.location.reload();
  }

  editCategory(): void {
    this.capitegoryService.update(this.categoryId ?? "", 
      this.categoryForm.value.name == "" || this.categoryForm.value.name == undefined ? null : this.categoryForm.value.name, 
      this.categoryForm.value.parents == "" ? null : this.categoryForm.value.parents)
    this.categoryForm.reset();
    window.location.reload();
  }

  hidePopup(): void {
    this.hiddenChange.emit(true)
  }
}
