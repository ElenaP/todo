import { Component, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item d-flex align-items-center justify-content-between w-100" *ngIf="!isEditMode; else editMode" (dblclick)="switchToEditMode()">
      <div class="form-check pt-2 pb-2">
        <input type="checkbox" class="form-check-input" [checked]="item['completed']" [(ngModel)]="item['completed']" (change)="changeItem()">
        <label [ngStyle]="{'text-decoration': item['completed'] ? 'line-through' : 'none'}" class="form-check-label">{{ item.title }}</label>
      </div>
      <button type="button" class="btn btn-link" (click)="deleteItem()"><i class="fas fa-times"></i></button>
    </div>
    <ng-template #editMode>
      <form #form="ngForm" (ngSubmit)="onSubmit(form.value)">
        <input type="text" name="title" [(ngModel)]="item.title">
      </form>
    </ng-template>
  `,
  styles: [':host { display: block; padding: 5px 0; } .todo-item .btn { display: none; } .todo-item:hover .btn { display: block; }']
})
export class TodoItemComponent {
  isEditMode: boolean = false;

  @Input()
  item;

  @Output()
  update = new EventEmitter<object>();

  @Output()
  delete = new EventEmitter<object>();

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if(!this.element.nativeElement.contains(event.target)) {
      this.isEditMode = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
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
    if(form.title) {
      this.update.emit(this.item);
    } else {
      this.delete.emit(this.item);
    }
  }
}
