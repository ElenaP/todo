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

  changeItem() {
    this.update.emit(this.item);
  }

  onSubmit(form) {
    this.isEditMode = false;
    form.title ? this.update.emit(this.item) : this.delete.emit(this.item);
  }
}
