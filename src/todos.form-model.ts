import { Dictionary } from './infrastructure/to-dictionary';
import { TodoReadDto } from './todo-read.dto';

export interface TodosFormModel {
  todos: Dictionary<TodoReadDto>;
}
