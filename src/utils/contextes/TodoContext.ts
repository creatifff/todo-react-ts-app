import React from "react";
import {FilterValuesType} from "./TodoProvider";

// Записываем все функции в виде пропсов для передачи в контекст
// null - либо выбран id либо ничего не выбрано (null)
// void функция ничего не вернет
export interface TodoContextProps {
    todosForFilter: Todo[];
    todos: Todo[];
    todoIdForEdit: Todo['id'] | null;
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
    changeTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
    addTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
    changeFilter: (value: FilterValuesType) => void;
    filteredTodos: FilterValuesType;
}

export const TodoContext = React.createContext<TodoContextProps>({
    todosForFilter: [],
    todoIdForEdit: null,
    addTodo: () => {},
    deleteTodo: () => {},
    changeTodo: () => {},
    checkTodo: () => {},
    selectTodoIdForEdit: () => {},
    changeFilter: () => {},
    todos: [],
    filteredTodos: "all",
});