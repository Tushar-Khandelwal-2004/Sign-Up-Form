import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./signin.module.css";

function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/user/signin", formData);

            if (response.data.success) {
                // Store JWT token in local storage
                localStorage.setItem("authToken", response.data.token);
                setMessage("Sign-In Successful! Redirecting in few seconds...");
                setMessageType(true);
                setTimeout(() => {
                    navigate("/todo"); // Change "/signin" to the path of your sign-in route
                }, 1500);
                // Redirect to a protected route or dashboard

            } else {
                setMessage(response.data.message || "Sign-In failed!");
                setMessageType(false);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred while signing in!");
            setMessageType(false);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.heading}>
                <h1>Sign In</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.formdata}>
                <div>
                    <input
                        className={styles.inputbtn}
                        placeholder="Type your email here"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        className={styles.inputbtn}
                        placeholder="Type your password here"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.submit}>
                    <button className={styles.btn} type="submit">Sign In</button>
                </div>
            </form>

            {message && (<div className={`${styles.message} ${messageType === true ? styles.success : styles.error}`}>{message}</div>)}
        </div>
    );
}

export default Signin;
