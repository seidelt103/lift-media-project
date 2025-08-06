import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/LiftForm.css';

function LiftForm({ onAddLift }) {
  // For lift name select dropdown box
  const [liftNames, setLiftNames] = useState([]);
  const [selectedLift, setSelectedLift] = useState('');

  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLift && sets && reps && weight) {
      console.log("Submitting lift:", selectedLift, sets, reps, weight);
      onAddLift(selectedLift, sets, reps, weight);
      setSelectedLift('');
      setSets('');
      setReps('');
      setWeight('');
    }
  };

  // Fetch names from lookup table
  useEffect(() => {
    // Just put in the full URL instead of using the URL from env
    axios.get("http://127.0.0.1:8000/liftnames")
      .then(res => setLiftNames(res.data));
  }, []);

  return (
    <form className="lift-form" onSubmit={handleSubmit}>
      <select
        value={selectedLift}
        onChange={e => setSelectedLift(e.target.value)}
        required
      >
        <option value="">Select a lift</option>
        {liftNames.map(lift => (
          <option key={lift.id} value={lift.id}>{lift.name}</option>
        ))}
      </select>
      <input
        className="lift-input"
        value={sets}
        onChange={e => setSets(e.target.value)}
        placeholder="Sets"
      />
      <input
        className="lift-input"
        value={reps}
        onChange={e => setReps(e.target.value)}
        placeholder="Reps"
      />
      <input
        className="lift-input"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        placeholder="Weight"
      />
      <button className="lift-submit" type="submit">Enter lift</button>
    </form>
  );
}

export default LiftForm;