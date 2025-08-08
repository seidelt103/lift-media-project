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

  // For workout id select dropdown box
  const [workoutIds, setWorkoutIds] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLift && sets && reps && weight && selectedWorkoutId) {
      console.log("Submitting lift:", selectedLift, sets, reps, weight, selectedWorkoutId);
      onAddLift(selectedLift, sets, reps, weight, selectedWorkoutId);
      setSelectedLift('');
      setSets('');
      setReps('');
      setWeight('');
      setSelectedWorkoutId('');
    }
  };

  // Fetch names from lookup table
  useEffect(() => {
    // Just put in the full URL instead of using the URL from env
    axios.get("http://127.0.0.1:8000/liftnames")
      .then(res => setLiftNames(res.data));
  }, []);

  // Fetch workout ids from lookup table
  useEffect(() => {
    // Just put in the full URL instead of using the URL from env
    axios.get("http://127.0.0.1:8000/workouts")
      .then(res => setWorkoutIds(res.data));
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
      <select
        value={selectedWorkoutId}
        onChange={e => setSelectedWorkoutId(e.target.value)}
        required
      >
        <option value="">Select a workout</option>
        {workoutIds.map(workout => (
          <option key={workout.WorkoutId} value={workout.WorkoutId}>{workout.WorkoutId}</option>
        ))}
      </select>
      <button className="lift-submit" type="submit">Enter lift</button>
    </form>
  );
}

export default LiftForm;