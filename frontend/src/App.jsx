import { useState, useEffect } from 'react';
import axios from 'axios'

import LiftList from './components/lifts/LiftList';
import LiftForm from './components/lifts/LiftForm';


function App() {
  const [liftData, setLiftData] = useState([]);
    // Use backticks, not apostrophes
  const endpoint = `${import.meta.env.VITE_API_URL}`;

  const fetchData = async () => {
    const response = await axios.get(endpoint);
    setLiftData(response.data);
  };

  const addLift = async (name, description) => {
    await axios.post(endpoint, { name, description });
    fetchData();
  };

  // Side effect for fetching data
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <LiftList lifts={liftData} />
      <LiftForm onAddLift={addLift} />
    </>
  );
}

export default App;
