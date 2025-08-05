import { useState, useEffect } from 'react';
import axios from 'axios';
import LiftList from '../components/lifts/LiftList';
import LiftForm from '../components/lifts/LiftForm';

function LiftsPage() {
  const [liftData, setLiftData] = useState([]);
  const endpoint = `${import.meta.env.VITE_API_URL}`;

  const fetchData = async () => {
    const response = await axios.get(endpoint);
    setLiftData(response.data);
  };

  const addLift = async (name, sets, reps, weight) => {
    await axios.post(endpoint, { name, sets, reps, weight });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Lifts</h1>
      <LiftForm onAddLift={addLift} />
      <LiftList lifts={liftData} fetchData={fetchData}/>
    </div>
  );
}

export default LiftsPage;