import { Component, Input } from '@angular/core';
import { CapitegoryService } from '../service/capitegory.service';
import { Category } from '../entity/category.entity';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreateCategoryComponent } from "../create-category/create-category.component";

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [RouterLink, CreateCategoryComponent],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

  @Input() id: string | null = null

  isHiddenPopUp: boolean = true;
  
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

  private async loadChildren() {
    this.childrenCategory = await this.capitegoryService.search(
      this.isRoot || this.id == null, 
      this.beforeDate, 
      this.afterDate, 
      this.id, 
      this.orderByName, 
      this.orderByCreationDate, 
      this.orderByNumberOfChild, 
      this.pageNumber, 
      this.pageSize);
  }

}
