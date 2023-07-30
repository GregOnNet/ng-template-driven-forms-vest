import { create, each, enforce, only, test } from "vest";
import { TodosFormModel } from "./todos.form-model";

export const createTodosFormSuite = () =>
  create("Todos", (model: TodosFormModel, fieldName: string) => {
    only(fieldName);

    const todos = Object.values(model.todos).filter((todo) => !!todo.id);

    each(todos, (entry) => {
      test(
        `todos.${entry.id}.title`,
        "Please specify a text.",
        () => {
          enforce(entry.title).isNotBlank();
        },
        `todos.${entry.id}.title`,
      );
    });
  });
