import { Component } from '@angular/core';
import { CapitegoryService } from '../service/capitegory.service';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

  constructor(private capitegoryService: CapitegoryService) {}

  async ngOnInit() {
    let result = await this.capitegoryService.getById("0d24129f-706f-453d-348d-08dcf6893c4a")
    console.log(result)
  }

}
