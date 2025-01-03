import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./todo.module.css";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/signin");
            return;
        }
        axios.get("http://localhost:3000/todo/gettodo", { headers: { token } })
            .then((response) => {
                if (response.data.success) {
                    setTodos(response.data.todos);
                }
            }).catch(() => {
                localStorage.removeItem("authToken");
                navigate("/signin");
            });

    }, [navigate]);

    async function addTodo() {
        const token = localStorage.getItem("authToken");
        if (!newTodo || !token) return;

        try {
            await axios.post(
                "http://localhost:3000/todo/addtodo",
                { title: newTodo, done: false },
                { headers: { token } }
            );
            setNewTodo("");
            fetchTodos();
        } catch (e) {
            alert("Failed to add todo!");
        }
    }
    async function fetchTodos() {
        const token = localStorage.getItem("authToken");
        try {
            const response = await axios.get("http://localhost:3000/todo/gettodo", {
                headers: { token },
            });
            if (response.data.success) {
                setTodos(response.data.todos);
            }
        } catch (e) {
            alert("Failed to fetch todos!");
        }
    }
    async function deleteTodo(id) {
        const token = localStorage.getItem("authToken");
        try {
            await axios.delete("http://localhost:3000/todo/deletetodo", {
                headers: { token, id },
            });
            fetchTodos();
        } catch (e) {
            alert("Failed to delete todo!");
        }
    }
    return (
        <div className={styles.main1}>
            <div className={styles.heading1}>
                <h1>Todo List</h1>
            </div>

            <ul>
                {todos.map((todo) => {
                    return (
                        <div className={styles.todoItem1} key={todo._id}>
                            <li className={styles.list1}>
                                {todo.title}
                                <button className={styles.dltbtn1} onClick={() => deleteTodo(todo._id)}>Delete</button>
                            </li>
                        </div>
                    );
                })}

            </ul>

            <div className={styles.addtodo1}>
                <input className={styles.input1} type="text" value={newTodo} placeholder="Type your Todo here!" onChange={(e) => setNewTodo(e.target.value)} />
                <button className={styles.dltbtn1} onClick={addTodo}>Add Todo</button>
            </div>

        </div>
    )

}
export default Todo;