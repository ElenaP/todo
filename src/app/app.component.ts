import { Component, OnInit } from '@angular/core';
import { iItem } from './items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  app: string = 'Todo list';
  title: string;
  items: iItem[] = [];
  status: string = "all";
  isMarkAllAsComplete: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('todo')) {
      this.items = JSON.parse(localStorage.getItem('todo'));
    }
  }

  updateItem(item) {
    this.items = this.items.map((el) => {
      if(el.id === item.id) {
        return item;
      } else {
        return el;
      }
    });
    localStorage.setItem('todo', JSON.stringify(this.items));
  }

  deleteItem(item) {
    this.items = this.items.filter((el) => {
      if(el.id !== item.id) {
        return el;
      }
    });
    localStorage.setItem('todo', JSON.stringify(this.items));
  }

  deleteCompletedItems() {
    this.items = this.items.filter((item) => !item.completed);
    localStorage.setItem('todo', JSON.stringify(this.items));
  }

  submitItem(form) {
    const id = this.items.length ? this.items[this.items.length -1].id + 1 : 0;
    this.items.push({'id': id, 'title': form.value.title, 'completed': false});
    form.resetForm();
    localStorage.setItem('todo', JSON.stringify(this.items));
  }

  markAllAsComplete() {
    this.isMarkAllAsComplete = !this.isMarkAllAsComplete;
    this.items = this.items.map((item) => {
      item.completed = this.isMarkAllAsComplete;
      return item;
    });
  }
}
