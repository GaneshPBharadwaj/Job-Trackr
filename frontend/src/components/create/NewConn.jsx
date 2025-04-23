import React, { useState } from 'react';
import styles from './NewConn.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connectionActions } from '../../reducers/connectionSlice'

const NewConn = ({ onClose }) => {

  const apiKey = import.meta.env.VITE_REACT_APP_URL;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    date: new Date().toISOString().split('T')[0], // yyyy-mm-dd
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('backendToken');
      const response = await axios.post(
        `${apiKey}/conn/addConn`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const connData = response.data.newConn;

      dispatch(connectionActions.addConnections({
        connId: connData._id,
        userId: connData.userId,
        date: connData.date,
        position: connData.position,
        company: connData.company,
        name: connData.name,
      }));

      onClose(); // close modal
    } catch (error) {
      console.error('Error creating Connections:', error.response?.data || error.message);
      alert('Failed to create Connections. Please try again.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New Connections</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
            <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required/>
            <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
            <input type="date" name="date" value={formData.date} onChange={handleChange}/>
            <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn}>Submit</button>
                <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default NewConn;
