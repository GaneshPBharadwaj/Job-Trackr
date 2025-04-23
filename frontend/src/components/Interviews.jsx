import React, { useState } from 'react';
import styles from './Interviews.module.css';
import NewInt from './create/NewInt';

const Interviews = ({ intList }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const totalInterviews = intList.length;

  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const monthlyInterviews = intList.filter(
    interview => new Date(interview.date) >= firstDayOfMonth
  );

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h2>{monthlyInterviews.length}</h2>
            <p>Interviews This Month</p>
          </div>
          <div className={styles.statCard}>
            <h2>{totalInterviews}</h2>
            <p>Total Interviews</p>
          </div>
        </div>
        <button className={styles.addButton} onClick={openModal}>Add Interview</button>
      </div>

      {modalOpen && <NewInt onClose={closeModal} />}

      <div className={styles.list}>
        <h3>All Interviews</h3>
        {intList.length === 0 ? (
          <p>No interviews scheduled yet.</p>
        ) : (
          intList.map(int => (
            <div key={int.intId} className={styles.intCard}>
              <div><strong>{int.position}</strong> @ <em>{int.company}</em></div>
              <div>
                On: {new Date(int.timings?.date).toLocaleDateString()} |
                Time: {formatTime(int.timings?.from)} - {formatTime(int.timings?.to)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Interviews;
