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
  @Output() hiddenChange: EventEmitter<boolean> = new EventEmitter()

  parentCategory: Category | null = null

  constructor(private capitegoryService: CapitegoryService) {}

  categoryForm = new FormGroup({
      name : new FormControl('')
  });

  parents: Category[] | null = null

  async ngOnInit() {
    if (this.parentId != null) {
      this.parentCategory = await this.capitegoryService.getById(this.parentId);
    }
  }

  createCategory(): void {
    this.capitegoryService.create(this.categoryForm.value.name ?? "", this.parentId);
    this.categoryForm.reset();
    window.location.reload();
  }

  hidePopup(): void {
    this.hiddenChange.emit(true)
  }
}
