import { useState } from "react";
import axios from "axios";
import styles from "./signup.module.css";
function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    })
    const [message, setMessage] = useState("");
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const respone = await axios.post("http://localhost:3000/user/signup", formData);
            setMessage(respone.data.message);
        } catch (e) {
            setMessage("An error occured while signing up!");
        }
    };
    return (
        <div className={styles.main}>
            <div className={styles.heading}>
                <h1>Sign Up</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.formdata}>

                <div>
                    <input
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
                        placeholder="Type your password here"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        placeholder="Type your firstname here"
                        type="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        placeholder="Type your lastname here"
                        type="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.submit}>
                    <button type="submit">Sign Up</button>
                </div>

            </form>

            {message && (
                <div className={styles.message}>
                    <p>{message}</p>
                </div>
            )}

        </div>
    )
}
export default Signup;