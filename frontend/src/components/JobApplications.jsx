import React, { useState } from 'react';
import styles from './JobApplications.module.css';
import NewJA from './create/NewJA';

const JobApplications = ({ jobList }) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const today = new Date().toDateString();

  const dailyJobs = jobList.filter(job => new Date(job.date).toDateString() === today);
  const totalJobs = jobList.length;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h2>{dailyJobs.length}</h2>
            <p>Jobs Applied Today</p>
          </div>
          <div className={styles.statCard}>
            <h2>{totalJobs}</h2>
            <p>Total Jobs Applied</p>
          </div>
        </div>

        <button className={styles.addButton} onClick={openModal}>Add Job</button>
      </div>

      {modalOpen && <NewJA onClose={closeModal} />}

      <div className={styles.list}>
        <h3>All Job Applications</h3>
        {jobList.length === 0 ? (
          <p>No job applications found.</p>
        ) : (
          jobList.map(job => (
            <div key={job.jobId} className={styles.jobCard}>
              <div><strong>{job.position}</strong> at <em>{job.company}</em></div>
              <div>{job.location}</div>
              <div>Status: {job.status}</div>
              <div>Source: {job.appSource}</div>
              <div>Applied on: {new Date(job.date).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobApplications;
