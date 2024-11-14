import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Input() id: string | null = null

  @Output() orderByNameChange: EventEmitter<boolean> = new EventEmitter()
  @Output() orderByCreationDate: EventEmitter<boolean> = new EventEmitter()
  @Output() orderByNumberOfChildren: EventEmitter<boolean> = new EventEmitter()
  @Output() isRootChange: EventEmitter<boolean | null> = new EventEmitter()
  @Output() afterDateChange: EventEmitter<Date | null> = new EventEmitter()
  @Output() beforeDateChange: EventEmitter<Date | null> = new EventEmitter()

  async onNewOrderByNameValue(newValue: Event) {
    let element = (newValue.target as HTMLInputElement)
    this.orderByNameChange.emit(element.checked)
  }

  async onNewOrderByCreationDate(newValue: Event) {
    let element = (newValue.target as HTMLInputElement)
    this.orderByCreationDate.emit(element.checked)
  }

  async onNewOrderByNumberOfChildren(newValue: Event) {
    let element = (newValue.target as HTMLInputElement)
    this.orderByNumberOfChildren.emit(element.checked)
  }

  async onNewIsRoot(newValue: Event) {
    let element = (newValue.target as HTMLInputElement)
    switch(element.value) {
      case 'all': this.isRootChange.emit(null); break;
      case 'yes': this.isRootChange.emit(true); break;
      case 'no' : this.isRootChange.emit(false)
    }
  }

  async onNewAfterDate(newValue: Event) {
    let element = (newValue.target as HTMLInputElement)
    this.afterDateChange.emit(element.value == "" ? null : new Date(element.value))
  }

  async onNewBeforeDate(newValue: Event) {
    let element = (newValue.target as HTMLInputElement)
    this.beforeDateChange.emit(element.value == "" ? null : new Date(element.value))
  }

}
