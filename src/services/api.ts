// services/api.ts
import { Todo } from '../types/Todo';

export const getTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar o TODO');
  }

  const data: Todo = await response.json();
  return data;
};