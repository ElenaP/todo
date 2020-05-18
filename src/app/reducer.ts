import { Action, createReducer, on } from '@ngrx/store';
import { Item } from './models/item';
import * as todoListActions from './actions';

const initialState: Item[] = [];

const todoReducer = createReducer(
  initialState,
  on(todoListActions.todoItemAdded, ((state, {title}) => {
    return [{
      id: state.length ? state[state.length -1].id + 1 : 0,
      title: title,
      completed: false,
    }, ...state];
  })),
  on(todoListActions.todoItemDeleted, ((state, {id}) => {
    // console.log('state', state);
    return state.filter(todo =>
      todo.id !== id
    );
  })),
  on(todoListActions.todoItemUpdated, ((state, {id, title, completed}) => {
    return state.map(todo =>
      todo.id === id ?
        Object.assign({}, todo, { title: title, completed: completed }) :
        todo
    );
  })),
  on(todoListActions.todoItemsCompletedAll, (state => {
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => Object.assign({}, todo, {
      completed: !areAllMarked
    }));
  })),
  on(todoListActions.todoClearedAllCompletedItems, (state => {
    return state.filter(todo => todo.completed === false);
  }))
);

export function reducer ( state, action: Action ): Item[] {
  return todoReducer(state, action);
}
