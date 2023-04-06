import React from "react";
import styles from './TodoItem.module.css';
import {Button} from "../../button/Button";

// Все пропсы передаются в компонент TodoItem
// todo берется глобально из index.d.ts
// Остальные функции принимают id Todo
interface TodoItemProps {
    todo: Todo;
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
}

// Для работы всех созданных функций нужно передать их пропсами
export const TodoItem: React.FC<TodoItemProps> = (
    {
        todo,
        checkTodo,
        deleteTodo,
        selectTodoIdForEdit
    }
) => {

    return (
        <div className={styles.todo_item_container}>
                <div className={styles.todo_item_main}>
                    <h2 aria-hidden
                        style={{
                            opacity: todo.checked ? 0.5 : 1,
                            textDecoration: todo.checked ? 'line-through' : 'none'
                        }}
                        onClick={() => checkTodo(todo.id)}
                        className={styles.todo_item_name}
                    >
                        {todo.name}
                    </h2>
                    {todo.description ? <p aria-hidden className={styles.todo_item_desc}>
                        {todo.description}
                    </p> : <div style={{height: 18.4}}></div>}
                    <div className={styles.info}>
                        {todo.deadline ? <div className={styles.todo_item_deadline}>
                            <i className="fa-regular fa-calendar"></i>
                            <span>{todo.deadline}</span>
                        </div> : <div style={{height: 17.6}}></div>}
                        <div className={styles.todo_item_created}>
                            Создано: {todo.created_at}
                        </div>
                    </div>
                </div>


            <div className={styles.buttons}>
                <Button color='orange' onClick={() => selectTodoIdForEdit(todo.id)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </Button>
                <Button color='red' onClick={() => deleteTodo(todo.id)}>
                    <i className="fa-regular fa-circle-xmark"></i>
                </Button>
            </div>
        </div>
    )
}