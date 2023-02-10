import styles from './Button.module.css';

export const ButtonNew = (props) => {
    return (
        <button 
        onClick={props.onClick}
        className={styles.submitButton}>
            {props.value}</button>
    )
}