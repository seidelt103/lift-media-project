import { useState } from 'react';
import axios from 'axios';

function AddWorkout({ fetchData, onCancel }) {
  const endpoint = `${import.meta.env.VITE_API_URL}`;
  
  const [workoutDate, setWorkoutDate] = useState(
    new Date().toISOString().split('T')[0] // Default to today's date
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (event) => {
    setWorkoutDate(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post('http://127.0.0.1:8000/workouts', {
        date: workoutDate
      });

      fetchData();
      setWorkoutDate(new Date().toISOString().split('T')[0]);
      if (onCancel) {
        onCancel();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setWorkoutDate(new Date().toISOString().split('T')[0]);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="overall-card add-workout-card">
      <form onSubmit={handleSubmit}>
        <h3>Add New Workout</h3>
        
        <div className="form-group">
          <label htmlFor="workout-date">Workout Date:</label>
          <input
            id="workout-date"
            type="date"
            value={workoutDate}
            onChange={handleDateChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isSubmitting}
            id="card-done-btn"
          >
            {isSubmitting ? 'Creating...' : 'Create Workout'}
          </button>
          <button 
            type="button" 
            onClick={handleCancel}
            disabled={isSubmitting}
            id="card-edit-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWorkout;