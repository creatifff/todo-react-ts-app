import React from "react";
import {TodoItem} from "./todoItem/TodoItem";
import {TodoPanel} from "../TodoPanel/TodoPanel";

interface TodoListProps {
    todos: Todo[];
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
    todoIdForEdit: Todo['id'] | null;
    changeTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    checkTodo,
    deleteTodo,
    changeTodo,
    selectTodoIdForEdit,
    todoIdForEdit,
    }) => (
    <div>
        {todos.map((todo) => {
            //@ts-ignore
            // Если выбран id, отобразится панель с редактированием задачи
            if (todo.id === todoIdForEdit)
                return (
                    <TodoPanel
                        key={todo.id}
                        mode='edit'
                        changeTodo={changeTodo}
                        editTodo={{name: todo.name, description: todo.description}}
                    />
                );
            // Если id не выбран, отображается TodoItem
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    checkTodo={checkTodo}
                    deleteTodo={deleteTodo}
                    selectTodoIdForEdit={selectTodoIdForEdit}
                />
            )
        })}
    </div>
);