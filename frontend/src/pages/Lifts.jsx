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

  const addLift = async (name, description) => {
    await axios.post(endpoint, { name, description });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Lifts</h1>
      <LiftForm onAddLift={addLift} />
      <LiftList lifts={liftData} />
    </div>
  );
}

export default LiftsPage;