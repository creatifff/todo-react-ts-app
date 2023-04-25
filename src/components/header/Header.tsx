import React from "react";
import styles from './Header.module.css';
import {useTodo} from "../../utils";


// В шапку передается количество задач
export const Header: React.FC = () => {
    const {todos} = useTodo();

    return (
        <div className={ styles.header_container }>
            <h1>
                Всего <b>{todos.length}</b> задач(и)
            </h1>
        </div>
    );
};