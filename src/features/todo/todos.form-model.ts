import { Dictionary } from '../../infrastructure';
import { TodoReadDto } from './todo-read.dto';

export interface TodosFormModel {
  todos: Dictionary<TodoReadDto>;
}
