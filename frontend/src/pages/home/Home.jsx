import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Dashboard from '../../components/Dashboard';
import JobApplications from '../../components/JobApplications';
import Interviews from '../../components/Interviews';
import NewConnections from '../../components/NewConnections';
import styles from './Home.module.css'; // CSS Module
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob } from '../../reducers/jobSlice';
import { fetchConn } from '../../reducers/connectionSlice';
import { fetchInt } from '../../reducers/interviewSlice';

function Home() {

  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [stats, setStats] = useState(null);

  const { jobList, jobLoading, jobError } = useSelector((state) => state.job);
  const { intList, intLoading, intError } = useSelector((state) => state.interview);
  const { connList, connLoading, connError } = useSelector((state) => state.connection);

  useEffect(() => {
      dispatch(fetchJob());
      dispatch(fetchConn());
      dispatch(fetchInt());
    }, [dispatch]);

  useEffect(() => {
    if (!jobLoading && !connLoading && !intLoading) {
      calculateDashboardStats();
    }
  }, [jobList, connList, intList, jobLoading, connLoading, intLoading]);


  const calculateDashboardStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalJobs = jobList.length;
    const totalConnections = connList.length;
    const totalInterviews = intList.length;

    const dailyJobs = jobList.filter(job => new Date(job.date).setHours(0, 0, 0, 0) === today.getTime()).length;

    const dailyConnections = connList.filter(conn => new Date(conn.date).setHours(0, 0, 0, 0) === today.getTime()).length;

    const percentage = ((dailyJobs / 20) + (dailyConnections / 10)) / 2 * 100;

    setStats({ totalJobs, totalConnections, totalInterviews, dailyJobs, dailyConnections, percentage: percentage.toFixed(2)});
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard stats={stats}/>;
      case 'jobApplications':
        return <JobApplications jobList={jobList}/>;
      case 'interviews':
        return <Interviews intList={intList}/>;
      case 'newConnections':
        return <NewConnections connList={connList}/>;
      default:
        return null;
    }
  };

  const menuItems = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Job Applications', value: 'jobApplications' },
    { label: 'Interviews', value: 'interviews' },
    { label: 'New Connections', value: 'newConnections' }
  ];

  if (jobLoading || intLoading || connLoading) {
    return <p>Loading...</p>;
  }

  // Handle error
  if (jobError || intError || connError) {
    return (
      <div>
        <h2>Error loading data</h2>
        <p>{jobError && `Job Error: ${jobError}`}</p>
        <p>{intError && `Interview Error: ${intError}`}</p>
        <p>{connError && `Connection Error: ${connError}`}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <h2 className={styles.menuTitle}>Menu</h2>
          <div className={styles.menu}>
            {menuItems.map(item => (
              <button
                key={item.value}
                className={`${styles.menuButton} ${activeComponent === item.value ? styles.active : ''}`}
                onClick={() => setActiveComponent(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Display Area */}
        <div className={styles.mainContent}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Home;
