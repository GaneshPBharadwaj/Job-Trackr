import React, { useState } from 'react';
import styles from './NewInt.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { interviewActions } from '../../reducers/interviewSlice';

const NewInt = ({ onClose }) => {

  const apiKey = import.meta.env.VITE_REACT_APP_URL;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    position: '',
    company: '',
    date: new Date().toISOString().split('T')[0], // yyyy-mm-dd
    timings: {
      from: '',
      to: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'from' || name === 'to') {
      setFormData(prev => ({
        ...prev,
        timings: {
          ...prev.timings,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('backendToken');

      const response = await axios.post(
        `${apiKey}/int/addInt`,  
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Interview POST response:', response.data);

      const intData = response.data.data;

      dispatch(interviewActions.addInterview({
        _id: intData._id,
        userId: intData.userId,
        date: intData.date,
        position: intData.position,
        company: intData.company,
        timings: {
          from: intData.timings.from,
          to: intData.timings.to
        }
      }));

      onClose();
    } catch (error) {
      console.error('Error creating Interview:', error.response?.data || error.message);
      alert('Failed to create Interview. Please try again.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New Interview</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required/>
          <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required/>
          <input type="date" name="date" value={formData.date} onChange={handleChange}/>
          <label>From</label>
          <input type="time" name="from" value={formData.timings.from} onChange={handleChange} required/>
          <label>To</label>
          <input type="time" name="to" value={formData.timings.to} onChange={handleChange} required/>
          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>Submit</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInt;
