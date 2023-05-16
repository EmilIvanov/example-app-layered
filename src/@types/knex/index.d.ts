import { Knex } from 'knex';
import {
  InsertTodo,
  InsertUser,
  Todo,
  UpdateTodo,
  UpdateUser,
  User,
} from '@data/entities';

// This is how knex adds TypeScript support.
// For more information see the docs https://knexjs.org/guide/#typescript.
declare module 'knex/types/tables' {
  interface Tables {
    users: Knex.CompositeTableType<User, InsertUser, UpdateUser>;
    todos: Knex.CompositeTableType<Todo, InsertTodo, UpdateTodo>;
  }
}
