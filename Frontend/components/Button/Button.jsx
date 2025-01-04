import styles from "./Button.module.css"
function Button({onClick}){
    return(
        <div className={styles.bdy}>
        <button onClick={onClick} className={styles.btn} type="button">
          Log Out
        </button>
      </div>
    )
}
export default Button;