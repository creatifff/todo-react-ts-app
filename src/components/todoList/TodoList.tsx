import React from "react";
import {TodoItem} from "./todoItem/TodoItem";
import {TodoPanel} from "../TodoPanel/TodoPanel";
import {useTodo} from "../../utils";


export const TodoList: React.FC = () => {
    // Все функции и параметры для задач из списка записываются в хук useTodo
    const {todos, todoIdForEdit, checkTodo, deleteTodo, selectTodoIdForEdit} = useTodo();
    return (
        <div>
            {/* По массиву задач проходимся методом map чтоб отобразить список */}
            {todos.map((todo) => {
                // Если выбран id, отобразится панель с редактированием задачи
                if (todo.id === todoIdForEdit)
                    return (
                        <TodoPanel
                            key={todo.id}
                            mode='edit'
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
}
