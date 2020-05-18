import { Component, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  isEditMode: boolean = false;

  @Input() item;

  @Output() readonly update = new EventEmitter<Item>();

  @Output() readonly delete = new EventEmitter<Item>();

  @HostListener('document:click', ['$event']) clickOut(event) {
    if(!this.element.nativeElement.contains(event.target)) {
      this.isEditMode = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.isEditMode = false;
  }

  constructor(private element: ElementRef) { }

  switchToEditMode() {
    this.isEditMode = true;
  }

  deleteItem() {
    this.delete.emit(this.item);
  }

  changeItem(item) {
    const copyItem = {... item};
    copyItem.completed = !copyItem.completed;
    this.update.emit(copyItem);
  }

  onSubmit(form) {
    this.isEditMode = false;
    const copyItem = {... this.item};
    copyItem.title = form.title;
    form.title ? this.update.emit(copyItem) : this.delete.emit(this.item);
  }
}
