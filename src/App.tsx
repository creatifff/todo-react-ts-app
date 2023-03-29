import React from 'react';
import './App.css';
import styles from './App.module.css';
import {Header} from './components/header/Header';
import {TodoPanel} from "./components/TodoPanel/TodoPanel";
import {TodoList} from "./components/todoList/TodoList";
import {TodoProvider} from "./utils";


export const App = () => (
    // с помощью контекста, обернув все приложение в провайдер, все компоненты имеют доступ к пропсам из контекста
    <TodoProvider>
        <div className="App">
            <div className={styles.app_container}>
                <div className={styles.container}>
                    <Header/>
                    <TodoPanel mode='add'/>
                    <TodoList/>
                </div>
            </div>
        </div>
    </TodoProvider>
);


export default App;
