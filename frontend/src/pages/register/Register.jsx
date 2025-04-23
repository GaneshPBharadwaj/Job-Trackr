import React, { useState } from "react";
import styles from "./register.module.css";
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const apiKey = import.meta.env.VITE_REACT_APP_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // console.log("Form Submitted", formData);

    try {
      const response = await fetch(`${apiKey}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Backend response:', data);
        navigate('/login');
        if (data && data.token) {
          const backendToken = data.token;
          localStorage.setItem('backendToken', backendToken);
          
        } else {
          console.error(data);
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err.message);
      setError('Error during registration. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>Register</button>

        <button
          type="button"
          className={styles.linkButton}
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default Register;
