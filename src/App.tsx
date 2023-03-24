import React from 'react';
import './App.css';
import DEFAULT_TODO_LIST from "./data/todos";
import styles from './App.module.css';
import {Header} from './components/header/Header';
import {TodoPanel} from "./components/TodoPanel/TodoPanel";
import {TodoList} from "./components/todoList/TodoList";


export const App = () => {

    // Состояние массива задач
    const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST); // *

    // Изначально элемент не выбран (null), но если выбран, то передается id todo
    const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(null);

    const selectTodoIdForEdit = (id: Todo['id']) => {
        setTodoIdForEdit(id);
    }

    // ???
    const addTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
        setTodos([...todos, {id: todos[todos.length - 1].id + 1, description, name, checked: false}])
    };

    // Функция для изменения статуса задачи "Выполнена"/"Не выполнена"
    const checkTodo = (id: Todo['id']) => {
        // В функции setTodos (управление сост. массива *) проходим по массиву todos методом map
        // Итерируется по одной todo
        setTodos(todos.map(todo => {
            // Если id задачи совпадает, меняем статус задачи на противоположный
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

    const changeTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
        setTodos(
            todos.map(todo => {
                // Если id задачи совпадает, меняем статус задачи на противоположный
                if (todo.id === todoIdForEdit) {
                    return {...todo, name, description};
                }
                // Для остальных задач статус не меняется, то есть возвращается та же todo
                return todo;
            })
        );

        setTodoIdForEdit(null);
    }

    return (
        <div className="App">
            <div className={styles.app_container}>
                <div className={styles.container}>
                    <Header todoCount={todos.length}/>
                    <TodoPanel mode='add' addTodo={addTodo}/>
                    <TodoList
                        todos={todos}
                        checkTodo={checkTodo}
                        deleteTodo={deleteTodo}
                        todoIdForEdit={todoIdForEdit}
                        selectTodoIdForEdit={selectTodoIdForEdit}
                        changeTodo={changeTodo}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
