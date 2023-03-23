import React from 'react';
import './App.css';
import DEFAULT_TODO_LIST from "./data/todos";
import styles from './App.module.css';
import {Header} from './components/header/Header';
import {TodoPanel} from "./components/TodoPanel/TodoPanel";


export const App = () => {

    // console.log('@todos', DEFAULT_TODO_LIST);

    const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);

    const addTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
        setTodos([...todos, {id: todos[todos.length - 1].id + 1, description, name, checked: false}])
    };

    return (
        <div className="App">
            <div className={styles.app_container}>
                <div className={styles.container}>
                    <Header todoCount={todos.length} />
                    <TodoPanel addTodo={addTodo}/>
                </div>
            </div>
        </div>
    );
}

export default App;
