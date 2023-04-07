import React, {useState} from "react";
import DEFAULT_TODO_LIST from "../../data/todos";
import {TodoContext} from "./TodoContext";


// Пропсы содержит все возможные свойства компонента TodoProvider
interface TodoProviderProps {
    children: React.ReactNode;
}

// Типы фильтров
export type FilterValuesType = 'all' | 'done' | 'undone';



// Все функции приложения будут работать через контекст. Поэтому создается функциональный компонент TodoProvider
// Принимает children для работы интерфейса
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
    // Принимает в себя заполняемые поля "name", "description", "deadline". Omit исключает ненужные для функции ключи "checked", "id", "created_at"
    const addTodo = ({name, description, deadline}: Omit<Todo, 'checked' | 'id' | 'created_at'>) => {
        // Для создания задачи будет генерироваться новый id. Берется id последней todo и добавляется + 1
        // По умолчанию todo будет со статусом "Не выполнена"
        setTodos([...todos,
            {
                id: todos[todos.length - 1].id + 1,
                description, // Это поле записывает юзер
                name, // Это поле записывает юзер
                deadline, // Это поле записывает юзер
                checked: false,
                created_at: new Date().toISOString().slice(0,10),
            }])
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
        // Фильтруется все, кроме тех, где есть совпадение по id (удаляется)
        setTodos(todos.filter(todo => todo.id !== id));
    }

    // Функция для редактирования задачи
    // Принимает редактируемые поля, нередактируемые исключаются с помощью Omit
    const changeTodo = ({name, description, deadline}: Omit<Todo, 'checked' | 'id' | 'created_at'>) => {
        // в setTodos, принимающей массив задач todos, методом map создаем новый массив
        setTodos(
            todos.map(todo => {
                // Если id задачи совпадает с выбранным id, передаем новые значения полей "name" и "description"
                if (todo.id === todoIdForEdit) {
                    return {...todo, name, description, deadline};
                }
                // Иначе задача остается как есть
                return todo;
            })
        );
        // Сбрасывает выбранную задачу (после редактирования закрывается панель ред)
        setTodoIdForEdit(null);
    };


    // Создается массив значений фильтра и записывается в стейт
    const [filteredTodos, setFilteredTodos] = useState<FilterValuesType>('all'); // Первоначально "Все"

    // Функция для фильтрации задач
    // Принимает пропсом одно из значений фильтра
    const changeFilter = (value: FilterValuesType) => {
        setFilteredTodos(value);
    }
    // Изначальный массив todos становится отфильтрованным массивом, состояние изменятся
    let todosForFilter = todos;

    // Сравнивается тип из стейта фильтров
    if (filteredTodos === 'done') {
        // Если совпал, отображаются завершенные
        todosForFilter = todos.filter(t => t.checked);
        // Если нет - незавершенные
    } else if (filteredTodos === 'undone') {
        todosForFilter = todos.filter(t => !t.checked);
    }



    // В useMemo заворачиваются все пропсы которые будут переданы из контекста
    const value = React.useMemo(
        () => ({
            todoIdForEdit,
            todosForFilter,
            deleteTodo,
            changeTodo,
            addTodo,
            selectTodoIdForEdit,
            checkTodo,
            changeFilter,
            todos,
            filteredTodos,
        }), [
            todoIdForEdit,
            todosForFilter,
            deleteTodo,
            changeTodo,
            addTodo,
            selectTodoIdForEdit,
            checkTodo,
            changeFilter,
            todos,
            filteredTodos,
        ]);

    // Компонент работает с Provider и в качестве value (пропса) принимает все переданные функции из контекста
    // Все вышеописанные функции передаются внутрь провайдера для отображения в App.tsx
    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}