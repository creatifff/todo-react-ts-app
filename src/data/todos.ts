const DEFAULT_TODO_LIST = [
    {
        id: 1,
        name: 'task1',
        description: 'sample text',
        checked: false,
    },
    {
        id: 2,
        name: 'task2',
        description: 'sample text',
        checked: false,
    },
    {
        id: 3,
        name: 'task3',
        description: 'sampletextsampletextsampletextsampletextsampletext',
        checked: true,
    }
]

export default DEFAULT_TODO_LIST;
//
// import React from "react";
// import DEFAULT_TODO_LIST from "../../data/todos";
//
// interface TodoProviderProps {
//     children: React.ReactNode;
// }
//
// export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
//     // Состояние массива задач
//     const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST); // *
//
//     // Изначально элемент не выбран (null), но если выбран, то передается id todo
//     const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(null);
//
//     const selectTodoIdForEdit = (id: Todo['id']) => {
//         setTodoIdForEdit(id);
//     }
//
//     // ???
//     const addTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
//         setTodos([...todos, {id: todos[todos.length - 1].id + 1, description, name, checked: false}])
//     };
//
//     // Функция для изменения статуса задачи "Выполнена"/"Не выполнена"
//     const checkTodo = (id: Todo['id']) => {
//         // В функции setTodos (управление сост. массива *) проходим по массиву todos методом map
//         // Итерируется по одной todo
//         setTodos(todos.map(todo => {
//             // Если id задачи совпадает, меняем статус задачи на противоположный
//             if (todo.id === id) {
//                 return {...todo, checked: !todo.checked};
//             }
//             // Для остальных задач статус не меняется, то есть возвращается та же todo
//             return todo;
//         }))
//     }
//
//     // Функция для удаления задачи
//     const deleteTodo = (id: Todo['id']) => {
//         // Фильтрация todos методом filter
//         // Фильтруется все, кроме тех, где есть совпадение по id
//         setTodos(todos.filter(todo => todo.id !== id));
//     }
//
//     const changeTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
//         setTodos(
//             todos.map(todo => {
//                 // Если id задачи совпадает, меняем статус задачи на противоположный
//                 if (todo.id === todoIdForEdit) {
//                     return {...todo, name, description};
//                 }
//                 // Для остальных задач статус не меняется, то есть возвращается та же todo
//                 return todo;
//             })
//         );
//
//         setTodoIdForEdit(null);
//     }
// }
//
//
//
//
// import React from "react";
//
// export interface TodoContextProps {
//     todos: Todo[];
//     todoIdForEdit: Todo['id'] | null;
//     checkTodo: (id: Todo['id']) => void;
//     deleteTodo: (id: Todo['id']) => void;
//     selectTodoIdForEdit: (id: Todo['id']) => void;
//     changeTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
//     addTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
// }
//
// export const TodoContext = React.createContext<TodoContextProps>({
//     todos: [],
//     todoIdForEdit: null,
//     addTodo: () => {},
//     deleteTodo: () => {},
//     changeTodo: () => {},
//     checkTodo: () => {},
//     selectTodoIdForEdit: () => {}
// });