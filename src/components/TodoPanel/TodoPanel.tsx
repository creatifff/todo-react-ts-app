import React, {KeyboardEvent, useState} from "react";
import styles from './TodoPanel.module.css';
import {Button} from "../button/Button";
import {useTodo} from "../../utils";

// Задача по умолчанию
const DEFAULT_TODO = {
    name: '',
    description: '',
    deadline: '',
}

// В интерфейсе добавления добавляется mode add
interface AddTodoPanelProps {
    mode: 'add';
}

// В интерфейсе редактирования id, checked, created_at не нужен поэтому исключается Omit
// Добавляется мод edit
interface EditTodoPanelProps {
    mode: 'edit';
    editTodo: Omit<Todo, 'id' | 'checked'| 'created_at'>;
}

// Два интерфейса с помощью юниона объединяем в один
type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {

    // Функции вытаскиваются из хука
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

    // Стейт ошибки. По умолчанию нет ошибки. Принимает строку (вывод текста ошибки)
    const [error, setError] = useState<string | null>(null);

    // Функция записывает значения и после нажатия кнопки стирает введенные данные
    const onClick = () => {
        // Если задача редактируется (mode: edit) то задача будет переписываться
        const todoItem = {
            name: todo.name,
            description: todo.description,
            deadline: todo.deadline,
        }
        // Если пустой заголовок, задача не добавится. Также если есть пробелы, они обрезаются методом trim()
        if(todo.name.trim() !== "") {
            if (isEdit) {
                return changeTodo(todoItem)
            }
            // Добавление нового или редактирование
            addTodo(todoItem);
            // Возврат пустых полей
            setTodo(DEFAULT_TODO);
            // также если нет заголовка, выводится текст ошибки
        } else {
            setError('Заголовок обязателен');
        }

    };

    // Тоже добавление, но по кнопке "Enter"
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            const todoItem = {
                name: todo.name,
                description: todo.description,
                deadline: todo.deadline,
            }
            if(todo.name.trim() !== "") {
                if (isEdit) {
                    return changeTodo(todoItem)
                }
                // Добавление нового или редактирование
                addTodo(todoItem);
                // Возврат пустых полей
                setTodo(DEFAULT_TODO);
            } else {
                setError('Заголовок обязателен');
            }
        }
    }


    return (
        <div className={styles.todo_panel_container}>
            <div className={styles.fields_container}>

                <div className={styles.field_container}>
                    <label htmlFor="name">
                        <div>Заголовок</div>
                        <input type="text" id="name"
                               value={todo.name}
                               name="name"
                               onChange={onChange}
                               onKeyPress={onKeyPressHandler}
                               className={error ? styles.error : ""}
                        />
                        {error && <div className={styles.error_message}>{error}</div>}
                    </label>
                </div>

                <div className={styles.field_container}>
                    <label htmlFor="description">
                        <div>Описание</div>
                        <input type="text" id="description"
                               value={todo.description}
                               name="description"
                               onChange={onChange}
                               onKeyPress={onKeyPressHandler}
                        />
                    </label>
                </div>

                <div className={styles.field_container}>
                    <label htmlFor="deadline">
                        <div>Срок выполнения</div>
                        <input type="date" id="deadline"
                               value={todo.deadline}
                               name="deadline"
                               onChange={onChange}
                               onKeyPress={onKeyPressHandler}
                        />
                    </label>
                </div>

            </div>

            <div className={styles.button_container}>
                {/* По умолчанию панели редактирования нет, поэтому кнопка ADD то есть только добавить */}
                {!isEdit && (
                    <Button color='blue' onClick={onClick}>
                        <i className="fa-solid fa-plus"></i>
                    </Button>
                )}
                {/* Если редактируется то появляется панель, вместо ADD кнопка EDIT */}
                {isEdit && (
                    <Button color='blue' onClick={onClick}>
                        <i className="fa-solid fa-check"></i>
                    </Button>
                )}
            </div>
        </div>
    );
};


