import React from "react";
import styles from './TodoItem.module.css';
import {Button} from "../../button/Button";

interface TodoItemProps {
    todo: Todo;
    checkTodo: (id:Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;


}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  checkTodo,
  deleteTodo,
  selectTodoIdForEdit
}) => {

    return (
        <div className={styles.todo_item_container}>
            <div>
                <div aria-hidden
                     style={{
                        opacity: todo.checked ? 0.5 : 1,
                        textDecoration: todo.checked ? 'line-through' : 'none'
                }}
                     onClick={() => checkTodo(todo.id)}
                     className={styles.todo_item_title}>
                    {todo.name}
                </div>
                <div aria-hidden className={styles.todo_item_desc}>
                    {todo.description}
                </div>
                <div className={styles.todo_item_btn}>
                    <Button color='orange' onClick={() => selectTodoIdForEdit(todo.id)}>EDIT</Button>
                    <Button color='red' onClick={() => deleteTodo(todo.id)}>DELETE</Button>
                </div>
            </div>
        </div>
    )
}