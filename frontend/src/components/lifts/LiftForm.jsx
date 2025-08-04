import { useState } from 'react';
import './css/LiftForm.css';

function LiftForm({ onAddLift }) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && sets && reps && weight) {
      onAddLift(name, sets, reps, weight);
      setName('');
      setSets('');
      setReps('');
      setWeight('');
    }
  };

  return (
    <form className="lift-form" onSubmit={handleSubmit}>
      <input
        className="lift-input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Lift name"
      />
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