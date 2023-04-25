declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// Глобальный объект Todo
// Для того, чтобы не импортировать в каждый файл
type Todo = {
    id: number;
    name: string;
    description: string;
    checked: boolean;
    created_at: string;
    deadline: string;
};