import React, { useState } from "react";
import styles from "./login.module.css";
import {useNavigate} from 'react-router-dom';
import { userActions } from "../../reducers/userSlice";
import {useDispatch} from 'react-redux';

const {setUser} = userActions;

const Login = () => {

  const apiKey = import.meta.env.VITE_REACT_APP_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    // console.log("Login Attempt:", formData);
    // Call API for authentication
    try {
        const resp = await fetch(`${apiKey}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
        });

        if (resp.ok) {
            const data = await resp.json();
            console.log('Backend response:', data);
            if(data && data.token){
                const backendToken = data.token;
                localStorage.setItem('backendToken', backendToken);
                const {_id, name, email} = data.user;
                const userData = {_id, name, email};
                dispatch(setUser(userData));
                navigate('/');
                // code for saving the user data
                
            }else {
                console.error(data);
            }
        } else {
        console.error('Backend error:', resp.status, resp.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }

  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
