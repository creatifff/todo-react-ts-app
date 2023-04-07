import React, {useState} from "react";
import {TodoItem} from "./todoItem/TodoItem";
import {TodoPanel} from "../TodoPanel/TodoPanel";
import {useTodo} from "../../utils";
import todos from "../../data/todos";

// Функция для получения времени todo для сортировки sortByCreatedAt
const getTime = (value: string): number => {
    return new Date(value).getTime();
}

export const TodoList = () => {

    const [sortTodos, setSortTodos] = useState(todos);


    // Функция сортировки по дате создания
    const sortByCreatedAt = sortTodos.sort((a: Todo, b: Todo) => {
        return getTime(a.created_at) > getTime(b.created_at) ? 1 : -1;
    });

    // Функция сортировки по сроку выполнения
    const sortByDeadline =sortTodos.sort((a: Todo, b: Todo) => {
        return getTime(a.deadline) > getTime(b.deadline) ? 1 : -1;
    });

    // Все функции и параметры для задач из списка записываются в хук useTodo
    const {
        todosForFilter,
        todoIdForEdit,
        checkTodo,
        deleteTodo,
        selectTodoIdForEdit,
        changeFilter,
        filteredTodos,
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
                <div className="sort__selects">
                    <select>
                        <option onClick={() => sortByCreatedAt} value="creation_at">По дате создания</option>
                        <option onClick={() => sortByDeadline} value="deadline">По сроку исполнения</option>
                    </select>
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
