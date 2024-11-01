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
    let result2 = await this.capitegoryService.getAll()
    //console.log(result2)

    //let result3 = await this.capitegoryService.create("JE SUIS UN CAPYBARA BEBE", '8ff916d4-55e6-4f95-4f94-08dcfa69437b')
    //console.log(result3)

    let result4 = await this.capitegoryService.update("6da314c4-43af-460c-4f9e-08dcfa69437b", "JE SUIS UN SUPER MIGNON CAPYBARA BEBE", "8dd29358-9c2c-4b1c-4f98-08dcfa69437b")
    console.log(result4)

    let result = await this.capitegoryService.getById("6da314c4-43af-460c-4f9e-08dcfa69437b")
    console.log(result)

    let result5 = await this.capitegoryService.delete("6da314c4-43af-460c-4f9e-08dcfa69437b");
    console.log(result5)

    let result6 = await this.capitegoryService.search();
    console.log(result6)
  }

}
