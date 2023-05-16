import {
  AuthServiceInterface,
  TodosServiceInterface,
} from '@business/interfaces';

declare module 'express-serve-static-core' {
  interface Request {
    auth: {
      sub: string;
      email: string;
    };
    services: {
      authService: AuthServiceInterface;
      todosService: TodosServiceInterface;
    };
  }
}
