import React from "react";
import {TodoContext} from "./TodoContext";

// Собственный хук для передачи всех функций в контекст
export const useTodo = () => React.useContext(TodoContext);