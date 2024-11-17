import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent {
  @Input() pageNumber : number = 5
  @Input() totalPages : number = 0

  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter()

  nextPage() {
    if(this.pageNumber >= this.totalPages) {
      return
    }
    this.pageNumberChange.emit(this.pageNumber + 1)
  }

  previousPage() {
    if(this.pageNumber == 1) {
      return
    }
    this.pageNumberChange.emit(this.pageNumber - 1)
  }
}
