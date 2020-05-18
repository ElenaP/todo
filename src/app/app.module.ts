import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

import { FormsModule }   from '@angular/forms';
import { StatusFilterPipe } from './pipes/filter.pipe';

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducer } from './reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    StatusFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ todo: reducer }),
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
