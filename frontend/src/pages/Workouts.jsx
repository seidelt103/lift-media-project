import { useState, useEffect } from 'react';
import axios from 'axios';
import LiftList from '../components/lifts/LiftList';
import LiftForm from '../components/lifts/LiftForm';

function WorkoutsPage() {
  const [liftData, setLiftData] = useState([]);
  const endpoint = `${import.meta.env.VITE_API_URL}`;

  const fetchData = async () => {
    const response = await axios.get(endpoint);
    setLiftData(response.data);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Workouts</h1>
      <LiftList lifts={liftData} />
    </div>
  );
}
export default WorkoutsPage;