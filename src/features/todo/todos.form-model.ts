import { Dictionary } from "../../infrastructure";
import { TodoReadDto } from "./todo-read.dto";

export interface TodosFormModel {
  todos: Dictionary<TodoReadDto>;
}

export function createEmptyFormModel(): TodosFormModel {
  return {
    todos: {},
  };
}
