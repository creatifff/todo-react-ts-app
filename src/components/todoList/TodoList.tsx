import React from "react";
import {TodoItem} from "./todoItem/TodoItem";
import {TodoPanel} from "../TodoPanel/TodoPanel";
import {useTodo} from "../../utils";

export const TodoList = () => {
    // Все функции и параметры для задач из списка записываются в хук useTodo
    const {
        todosForFilter,
        todoIdForEdit,
        checkTodo,
        deleteTodo,
        selectTodoIdForEdit,
        changeFilter,
        filteredTodos,
        // sortedTodos,
    } = useTodo();
    return (
        <>
            <div className="todolist__container">
                <div className="filter__buttons">
                    <button id={filteredTodos === 'all' ? "active__filter" : ""}
                            onClick={() => {changeFilter('all')}}
                    >
                        Все
                    </button>
                    <button id={filteredTodos === 'done' ? "active__filter" : ""}
                            onClick={() => {changeFilter('done')}}
                    >
                        Выполнено
                    </button>
                    <button id={filteredTodos === 'undone' ? "active__filter" : ""}
                            onClick={() => {changeFilter('undone')}}
                    >
                        Не выполнено
                    </button>
                </div>
                {/* По массиву задач проходимся методом map чтоб отобразить список */}
                {todosForFilter.map((todo) => {
                    // Если выбран id, отобразится панель с редактированием задачи
                    if (todo.id === todoIdForEdit)
                        return (
                            <TodoPanel
                                key={todo.id}
                                mode='edit'
                                editTodo={
                                    {
                                        name: todo.name,
                                        description: todo.description,
                                        deadline: todo.deadline,
                                    }
                                }
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
        </>
    );
}
