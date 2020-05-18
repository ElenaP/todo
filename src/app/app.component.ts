import { Component, OnInit } from '@angular/core';
import { Item } from './models/item';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as todoListActions from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  app = 'Todo list';
  title = '';
  status = "all";
  items$: Observable<Item[]>;

  constructor(
    private readonly store: Store<{ todo: Item[] }>
  ) {}

  ngOnInit(): void {
    this.items$ = this.store.pipe(select('todo'));
  }

  addItem(form) {
    this.store.dispatch(todoListActions.todoItemAdded({ title: form.value.title }));
    form.resetForm();
  }

  deleteItem(item) {
    this.store.dispatch(todoListActions.todoItemDeleted({ id: item.id }));
  }

  updateItem(item) {
    this.store.dispatch(todoListActions.todoItemUpdated({ id: item.id, title: item.title, completed: item.completed } ));
  }

  markAllItemsAsComplete() {
    this.store.dispatch(todoListActions.todoItemsCompletedAll());
  }

  clearCompletedItems() {
    this.store.dispatch(todoListActions.todoClearedAllCompletedItems());
  }
}
