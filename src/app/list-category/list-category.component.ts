import { Component, Input } from '@angular/core';
import { CapitegoryService } from '../service/capitegory.service';
import { Category } from '../entity/category.entity';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

  @Input() id: number | null = null
  
  isRoot: boolean | null = null
  beforeDate: Date | null = null
  afterDate: Date | null = null
  orderByName: boolean | null = null
  orderByCreationDate: boolean | null = null
  orderByNumberOfChild: boolean | null = null
  pageNumber: number = 1
  pageSize: number = 5

  parentCategory: Category | null = null
  childrenCategory: Category[] = []

  constructor(private capitegoryService: CapitegoryService) {}

  async ngOnInit() {
    if (this.id != null) {
      this.parentCategory = await this.capitegoryService.getById(String(this.id));
    }
    this.childrenCategory = await this.capitegoryService.search(
      this.isRoot, 
      this.beforeDate, 
      this.afterDate, 
      this.id == null ? null : String(this.id), 
      this.orderByName, 
      this.orderByCreationDate, 
      this.orderByNumberOfChild, 
      this.pageNumber, 
      this.pageSize);
      console.log(this.childrenCategory[0].creationDate)
  }

}
