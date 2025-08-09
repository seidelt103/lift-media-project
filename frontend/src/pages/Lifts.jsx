import { useState, useEffect } from 'react';
import axios from 'axios';
import LiftList from '../components/lifts/LiftList';
import LiftForm from '../components/lifts/LiftForm';

function LiftsPage() {
  const [liftData, setLiftData] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    const response = await axios.get(`${baseUrl}`);
    setLiftData(response.data);
  };

  const addLift = async (lift_id, sets, reps, weight, workoutId) => {
    try {
      console.log('Adding lift:', { lift_id, sets, reps, weight, workoutId });
      
      const liftData = {
        lift_name: lift_id, 
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseFloat(weight),
        fk_workout: parseInt(workoutId)
      };
      
      const response = await axios.post(`${baseUrl}`, liftData); 
      console.log('Lift added successfully:', response.data);
      
      // Refresh the data after successful addition
      await fetchData();
    } catch (error) {
      console.error('Error adding lift:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '3rem 0 0 0' }}>Lifts</h1>
      <LiftList lifts={liftData} fetchData={fetchData}/>
      <LiftForm onAddLift={addLift} />
    </div>
  );
}

export default LiftsPage;