import { useState } from "react";
import axios from "axios";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";
function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    })
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();
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
            setMessageType(respone.data.success);
            if (respone.data.success) {
                setTimeout(() => {
                    navigate("/signin"); 
                }, 1500);
            }
        } catch (e) {
            setMessage("An error occured while signing up!");
            setMessageType(false);
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

                <div>
                    <input
                        className={styles.inputbtn}
                        placeholder="Type your firstname here"
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        className={styles.inputbtn}
                        placeholder="Type your lastname here"
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.submit}>
                    <button className={styles.btn} type="submit">Sign Up</button>
                </div>

            </form>

            <div className={styles.temp}>
                <div>
                    Already an user?
                </div>
                <div>
                    Click here to sign in<button className={styles.btnin} onClick={() => { navigate("/signin") }}>Sign in</button>
                </div>
            </div>

            {message && (
                <div
                    className={`${styles.message} ${messageType === true ? styles.success : styles.error
                        }`}
                >
                    <p>{message}</p>
                </div>
            )}


        </div>
    )
}
export default Signup;