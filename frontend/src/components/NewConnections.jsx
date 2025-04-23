import React, {useState} from 'react';
import styles from './NewConnections.module.css';
import NewConn from './create/NewConn';

const NewConnections = ({ connList }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const today = new Date().toDateString();

  const dailyConnections = connList.filter(conn => new Date(conn.date).toDateString() === today);
  const totalConnections = connList.length;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h2>{dailyConnections.length}</h2>
            <p>Connections Made Today</p>
          </div>
          <div className={styles.statCard}>
            <h2>{totalConnections}</h2>
            <p>Total Connections</p>
          </div>
        </div>
        <button className={styles.addButton} onClick={openModal}>Add New Connection</button>
      </div>
      {modalOpen && <NewConn onClose={closeModal} />}


      <div className={styles.list}>
        <h3>All Connections</h3>
        {connList.length === 0 ? (
          <p>No connections added yet.</p>
        ) : (
          connList.map(conn => (
            <div key={conn.connId} className={styles.connCard}>
              <div><strong>{conn.name}</strong> - {conn.position} at <em>{conn.company}</em></div>
              <div>Connected on: {new Date(conn.date).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewConnections;
