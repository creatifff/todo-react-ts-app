import React from "react";
import styles from './Button.module.css';

// Наследование от ComponentPropsWithRef. Передача button для того чтоб не дублировать методы onClick и т.д.
interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    // Так как все кнопки в приложении это один и тот же компонент, для разницы восприятия создается кастом пропс с выбором цвета
    color: 'orange' | 'blue' | 'red';
}

// В компоненте определяются пропсы которые будут в кнопке
export const Button: React.FC<ButtonProps> = ({children, color, onClick, ...props}) => {
    // Имя класса из модуля для выбора цвета кнопки
    // .button по умолчанию для любой кнопки. Далее - ее цвет
    const className = `${styles.button} ${styles[`button_${color}`]}`

    // children определяет название кнопки, color - цвет, onClick - событие по нажатию, props - все остальные свойства
    return (
        <button className={className} onClick={onClick} {...props}>
            {children}
        </button>
    )
}
