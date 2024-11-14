import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent {
  @Input() pageNumber : number = 5
}
