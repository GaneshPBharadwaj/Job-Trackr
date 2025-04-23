import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css'

const Navbar = () => {

    const { name } = useSelector((state) => state.user);

    const handleLogout = () => {
        localStorage.removeItem('backendToken');
        window.location.reload(); // or navigate to login page
    };


    return (
        <div className={styles.navbar}>
            <span>Hello {name}</span>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar
