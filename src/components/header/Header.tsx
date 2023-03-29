import React from "react";
import styles from './Header.module.css';
import {useTodo} from "../../utils";



export const Header: React.FC = () => {
    const {todos} = useTodo();

    return (
        <div className={ styles.header_container }>
            <h1>
                Todo list <b>{todos.length}</b> task(s)
            </h1>
        </div>
    );
};