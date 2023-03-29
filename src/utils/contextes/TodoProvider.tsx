import React from "react";
import DEFAULT_TODO_LIST from "../../data/todos";
import {TodoContext} from "./TodoContext";

// Пропс содержит все возможные свойства компонента TodoProvider
interface TodoProviderProps {
    children: React.ReactNode;
}

// Все функции приложения будут работать через контекст. Поэтому создается функциональный компонент TodoProvider
// Передается children для работы интерфейса
export const TodoProvider: React.FC<TodoProviderProps> = ({children}) => {
    // Массив задач. todos - сам массив, setTodos - функция для взаимодействия с ним
    const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);

    // Изначально элемент не выбран (null), но если выбран, то передается id todo
    const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(null);

    // Функция для выбора задачи для редактирования по id
    const selectTodoIdForEdit = (id: Todo['id']) => {
        setTodoIdForEdit(id);
    }

    // Функция для добавления задачи
    // Принимает в себя заполняемые поля "name", "description". Omit исключает ненужные для функции ключи "checked", "id"
    const addTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
        // Для создания задачи будет генерироваться новый id. Берется id последней todo и добавляется + 1
        // По умолчанию todo будет со статусом "Не выполнена"
        setTodos([...todos, {id: todos[todos.length - 1].id + 1, description, name, checked: false}])
    };

    // Функция для изменения статуса задачи "Выполнена"/"Не выполнена"
    // Принимает id задачи
    const checkTodo = (id: Todo['id']) => {
        // С функцией setTodos проходим по массиву todos методом map
        // Итерируется по одной todo
        setTodos(todos.map(todo => {
            // Если id задачи совпадает, меняем статус задачи на противоположный (true/false)
            if (todo.id === id) {
                return {...todo, checked: !todo.checked};
            }
            // Для остальных задач статус не меняется, то есть возвращается та же todo
            return todo;
        }))
    }

    // Функция для удаления задачи
    const deleteTodo = (id: Todo['id']) => {
        // Фильтрация todos методом filter
        // Фильтруется все, кроме тех, где есть совпадение по id
        setTodos(todos.filter(todo => todo.id !== id));
    }

    // Функция для редактирования задачи
    // Принимает редактируемые поля, нередактируемые исключаются с помощью Omit
    const changeTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
        // в setTodos, принимающей массив задач todos, методом map создаем новый массив
        setTodos(
            todos.map(todo => {
                // Если id задачи совпадает с выбранным id, передаем новые значения полей "name" и "description"
                if (todo.id === todoIdForEdit) {
                    return {...todo, name, description};
                }
                // Иначе задача остается как есть
                return todo;
            })
        );
        // Сбрасывает выбранную задачу (после редактирования закрывается панель ред)
        setTodoIdForEdit(null);
    };

    // В useMemo заворачиваются все функции которые будут переданы из контекста
    // Компонент обновится только при вызове конкретной функции из хука
    const value = React.useMemo(
        () => ({
            todoIdForEdit,
            todos,
            deleteTodo,
            changeTodo,
            addTodo,
            selectTodoIdForEdit,
            checkTodo,
        }), [
            todoIdForEdit,
            todos,
            deleteTodo,
            changeTodo,
            addTodo,
            selectTodoIdForEdit,
            checkTodo,
        ]);

    // Компонент работает с Provider и в качестве value (пропса) принимает все переданные функции из контекста
    // Все вышеописанные функции передаются внутрь провайдера для работы в App.tsx
    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}