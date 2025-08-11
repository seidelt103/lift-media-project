import { useState, useEffect } from 'react';
import axios from 'axios';
import LiftList from '../components/lifts/LiftList';
import LiftForm from '../components/lifts/LiftForm';
import WorkoutCards from '../components/lifts/WorkoutCards';

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
      <h1 style={{ textAlign: 'center', fontSize: '70px', margin: '6rem auto 5rem auto', paddingBottom: '1.5rem', borderBottom: '3px solid #FFFFFF', width: '90%'}}>Workout Log</h1>
      {/* Pass in all lift data */}
      <WorkoutCards lifts={liftData} fetchData={fetchData}/>
    </div>
  );
}
export default WorkoutsPage;