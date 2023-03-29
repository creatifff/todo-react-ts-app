import React from "react";

// Записываем все функции в виде пропсов для передачи в контекст
export interface TodoContextProps {
    todos: Todo[];
    todoIdForEdit: Todo['id'] | null;
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
    changeTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
    addTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    todos: [],
    todoIdForEdit: null,
    addTodo: () => {},
    deleteTodo: () => {},
    changeTodo: () => {},
    checkTodo: () => {},
    selectTodoIdForEdit: () => {}
});