import React from 'react';
import styles from './Dashboard.module.css';

function Dashboard({ stats }) {

  if (!stats) {
    return <div className={styles.dashboard}>Loading stats...</div>;
  }
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p className={styles.value}>{stats.dailyJobs}</p>
          <p className={styles.label}>Daily Jobs Applied</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{stats.totalJobs}</p>
          <p className={styles.label}>Total Jobs Applied</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{stats.dailyConnections}</p>
          <p className={styles.label}>Daily New Connections</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{stats.totalConnections}</p>
          <p className={styles.label}>Total New Connections</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{stats.totalInterviews}</p>
          <p className={styles.label}>Total Interviews</p>
        </div>
        <div className={styles.card}>
          <p className={styles.value}>{stats.percentage}%</p>
          <p className={styles.label}>Percentage</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
