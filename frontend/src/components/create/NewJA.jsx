import React, { useState } from 'react';
import styles from './NewJA.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { jobActions } from '../../reducers/jobSlice';

const NewJA = ({ onClose }) => {

  const apiKey = import.meta.env.VITE_REACT_APP_URL;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    status: 'Applied',
    appSource: '',
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
        `${apiKey}/job/addJob`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const jobData = response.data.newJob;

      dispatch(jobActions.addJob({
        jobId: jobData._id,
        userId: jobData.userId,
        date: jobData.date,
        position: jobData.position,
        company: jobData.company,
        location: jobData.location,
        status: jobData.status,
        appSource: jobData.appSource,
      }));

      onClose(); // close modal
    } catch (error) {
      console.error('Error creating job:', error.response?.data || error.message);
      alert('Failed to create job. Please try again.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New Job Application</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required/>
          <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required/>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input type="text" name="appSource"placeholder="Application Source" value={formData.appSource} onChange={handleChange} required/>
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

export default NewJA;
