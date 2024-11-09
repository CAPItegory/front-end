import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() orderByNameChange: EventEmitter<boolean> = new EventEmitter()

  async onNewOrderByNameValue(newValue: Event) {
    console.log((newValue.target as HTMLInputElement).value)
  }

}
