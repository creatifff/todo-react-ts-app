import React from "react";
import {TodoItem} from "./todoItem/TodoItem";
import {TodoPanel} from "../TodoPanel/TodoPanel";
import {useTodo} from "../../utils";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";


export const TodoList = () => {
    // Все функции и параметры для задач с помощью useTodo передаются в компонент
    const {
        todosForSort,
        todoIdForEdit,
        checkTodo,
        deleteTodo,
        selectTodoIdForEdit,
        changeFilter,
        changeSort,
        filteredTodos,
    } = useTodo();
    return (
        <>
            <div className="todolist__container">
                <div className="filter__buttons">
                    <Button
                        onClick={() => {changeFilter('all')}}
                        variant={filteredTodos === 'all' ? "contained" : "outlined"}
                    >
                        Все
                    </Button>
                    <Button onClick={() => {changeFilter('done')}}
                            variant={filteredTodos === 'done' ? "contained" : "outlined"}
                    >
                        Выполнено
                    </Button>
                    <Button onClick={() => {changeFilter('undone')}}
                            variant={filteredTodos === 'undone' ? "contained" : "outlined"}
                    >
                        Не выполнено
                    </Button>
                </div>
                <div className="sort__selects">
                    <FormControl sx={{width: 220, fontSize: 14}}>
                        <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Сортировка"
                        >
                            {/*<MenuItem*/}
                            {/*    value="Не сортировать"*/}
                            {/*    onClick={() => {changeSort('default')}}*/}
                            {/*    selected={true}*/}
                            {/*>*/}
                            {/*    Не сортировать*/}
                            {/*</MenuItem>*/}
                            <MenuItem
                                value="По дате создания"
                                onClick={() => {changeSort('by_date')}}
                            >
                                По дате создания
                            </MenuItem>
                            <MenuItem
                                value="По сроку выполнения"
                                onClick={() => {changeSort('by_deadline')}}
                            >
                                По сроку выполнения
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {/* По массиву задач проходимся методом map чтоб отобразить список */}
                {todosForSort.map((todo) => {
                    // Если выбран id, отобразится панель с редактированием задачи
                    if (todo.id === todoIdForEdit)
                        return (
                            <TodoPanel
                                key={todo.id}
                                mode='edit'
                                // Редактируются поля name, desc, deadline
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
