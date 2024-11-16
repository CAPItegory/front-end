import { Component, Input } from '@angular/core';
import { CapitegoryService } from '../service/capitegory.service';
import { Category } from '../entity/category.entity';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreateCategoryComponent } from "../create-category/create-category.component";
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PaginationBarComponent } from '../pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [RouterLink, SearchBarComponent, PaginationBarComponent, CreateCategoryComponent],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

  @Input() id: string | null = null

  isHiddenPopUp: boolean = true;
  isHiddenEditPopUp: boolean = true;
  
  isRoot: boolean | null = this.id == null
  beforeDate: Date | null = null
  afterDate: Date | null = null
  orderByName: boolean = true
  orderByCreationDate: boolean = false
  orderByNumberOfChild: boolean = false
  pageNumber: number = 1
  pageSize: number = 5
  totalPages: number = 0

  parentCategory: Category | null = null
  childrenCategory: Category[] = []
  selectedChild: string | null = null

  constructor(private capitegoryService: CapitegoryService, private activatedRoute : ActivatedRoute) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      if (this.id != null) {
        this.parentCategory = await this.capitegoryService.getById(String(this.id));
      }
      this.loadChildren()
    });
  }

  public showCreatePopUp() {
    this.isHiddenPopUp = false;
  }

  public showEditPopUp(categoryId : string) {
    this.selectedChild = categoryId
    this.isHiddenEditPopUp = false;
  }

  public hidePopUp() {
    this.isHiddenPopUp = true;
    this.isHiddenEditPopUp = true;
  }

  async onNewOrderByNameValue(newValue: boolean) {
    this.orderByName = newValue;
    this.loadChildren()
  }

  async onNewOrderByCreationDate(newValue: boolean) {
    this.orderByCreationDate = newValue;
    this.loadChildren()
  }

  async onNewOrderByNumberOfChildren(newValue: boolean) {
    this.orderByNumberOfChild = newValue;
    this.loadChildren()
  }

  async onNewIsRoot(newValue: boolean | null) {
    console.log(newValue)
    this.isRoot = newValue;
    this.loadChildren()
  }

  async onNewAfterDate(newValue: Date | null) {
    this.afterDate = newValue;
    this.loadChildren()
  }

  async onNewBeforeDate(newValue: Date | null) {
    this.beforeDate = newValue;
    this.loadChildren()
  }

  backEvent() {
    history.back()
  }

  deleteCategory(id: string) {
    this.capitegoryService.delete(id)
    window.location.reload();
  }

  private async loadChildren() {
    var paginatedCategories = await this.capitegoryService.search(
      this.isRoot, 
      this.beforeDate, 
      this.afterDate, 
      this.id, 
      this.orderByName, 
      this.orderByCreationDate, 
      this.orderByNumberOfChild, 
      this.pageNumber, 
      this.pageSize);
    this.childrenCategory = paginatedCategories.categories;
    console.log(paginatedCategories)
    this.totalPages = paginatedCategories.numberOfPage;
  }

}
