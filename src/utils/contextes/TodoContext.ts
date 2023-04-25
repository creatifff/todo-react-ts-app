import React from "react";
import {FilterValuesType, SortValuesType} from "./TodoProvider";

// Записываем все функции в виде пропсов для передачи в контекст
// null - либо выбран id либо ничего не выбрано (null)
// void функция ничего не вернет
export interface TodoContextProps {
    todosForSort: Todo[];
    todosForFilter: Todo[];
    todos: Todo[];
    todoIdForEdit: Todo['id'] | null;
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
    changeTodo: ({name, description, deadline}: Omit<Todo, 'checked' | 'id' | 'created_at'>) => void;
    addTodo: ({name, description, deadline}: Omit<Todo, 'checked' | 'id' | 'created_at'>) => void;
    changeFilter: (value: FilterValuesType) => void;
    filteredTodos: FilterValuesType;
    changeSort: (value: SortValuesType) => void;
    sortTodos: SortValuesType;
}

export const TodoContext = React.createContext<TodoContextProps>({
    todosForSort: [],
    todosForFilter: [],
    todoIdForEdit: null,
    addTodo: () => {},
    deleteTodo: () => {},
    changeTodo: () => {},
    checkTodo: () => {},
    selectTodoIdForEdit: () => {},
    changeFilter: () => {},
    changeSort: () => {},
    todos: [],
    filteredTodos: "all",
    sortTodos: "default"
});