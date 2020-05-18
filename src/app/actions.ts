import { createAction, props } from '@ngrx/store';

export const todoItemAdded = createAction(
'ADD_TODO',
      props<{ title: string }>()
);

export const todoItemDeleted = createAction(
  'DELETE_TODO',
  props<{ id: number }>()
);

export const todoItemUpdated = createAction(
  'UPDATE_TODO',
  props<{ id: number, title: string, completed: boolean }>()
);

export const todoItemsCompletedAll = createAction(
  'COMPLETE_All'
);

export const todoClearedAllCompletedItems = createAction(
  'CLEAR_COMPLETED'
);


