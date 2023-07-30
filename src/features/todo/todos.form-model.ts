import { Dictionary } from "../../infrastructure";
import { ReadTodoDto } from "./dto";

export interface TodosFormModel {
  todos: Dictionary<ReadTodoDto>;
}

export function createEmptyFormModel(): TodosFormModel {
  return {
    todos: {},
  };
}
