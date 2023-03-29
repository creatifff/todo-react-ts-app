import React from "react";
import styles from './TodoPanel.module.css';
import {Button} from "../button/Button";
import {useTodo} from "../../utils";

// Задача по умолчанию
const DEFAULT_TODO = {
    name: '',
    description: '',
}

// В интерфейсе добавления добавляется mode add
interface AddTodoPanelProps {
    mode: 'add';
}

// В интерфейсе редактирования id и checked не нужен поэтому исключается Omit
// Добавляется мод edit
interface EditTodoPanelProps {
    mode: 'edit';
    editTodo: Omit<Todo, 'id' | 'checked'>;
}

// Два интерфейса с помощью юниона объединяем в один
type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {

    const {changeTodo, addTodo} = useTodo();

    // Выбираем режим для редактирования
    const isEdit = props.mode === 'edit';

    // Состояние одной задачи, по умолчанию - пустые поля
    // Если задача редактируется, то текущие данные из пропсов editTodo
    const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO);

    // Функция записывает значения из инпутов
    // Принимает событие ChangeEvent
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Деструктуризация для создания пары ключ-значение
        const {name, value} = event.target;
        // С помощью функции setTodo данные из полей будут записываться в state задачи
        setTodo({...todo, [name]: value});
    };

    // Функция записывает значения и после нажатия кнопки стирает введенные данные
    const onClick = () => {
        // Если задача редактируется (mode: edit) то задача будет переписываться
        const todoItem = {name: todo.name, description: todo.description}
        if (isEdit) {
            return changeTodo(todoItem)
        }

        addTodo(todoItem);
        setTodo(DEFAULT_TODO);
    };


    return (
        <div className={styles.todo_panel_container}>
            <div className={styles.fields_container}>

                <div className={styles.field_container}>
                    <label htmlFor="name">
                        <div>Name</div>
                        <input type="text" id="name" value={todo.name} name="name" onChange={onChange}/>
                    </label>
                </div>

                <div className={styles.field_container}>
                    <label htmlFor="description">
                        <div>Description</div>
                        <input type="text" id="description" value={todo.description} name="description"
                               onChange={onChange}/>
                    </label>
                </div>

            </div>

            <div className={styles.button_container}>
                {/* По умолчанию панели редактирования нет, поэтому кнопка ADD то есть только добавить */}
                {!isEdit && (
                    <Button color='blue' onClick={onClick}>
                        ADD
                    </Button>
                )}
                {/* Если редактируется то появляется панель, вместо ADD кнопка EDIT */}
                {isEdit && (
                    <Button color='orange' onClick={onClick}>
                        EDIT
                    </Button>
                )}
            </div>
        </div>
    );
};


