import { Todo } from '@data/entities';

export const getTodoPayload: (
  completed?: boolean
) => Pick<Todo, 'name' | 'note' | 'completed'> = (completed) => ({
  name: 'Laundry' + Date.now(),
  note: 'Buy detergent' + Date.now(),
  completed: completed ?? false,
});
