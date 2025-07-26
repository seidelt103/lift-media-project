import { useState } from 'react';
import './css/LiftForm.css';

function LiftForm({ onAddLift }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      onAddLift(name, description);
      setName('');
      setDescription('');
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
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button className="lift-submit" type="submit">Enter lift</button>
    </form>
  );
}

export default LiftForm;