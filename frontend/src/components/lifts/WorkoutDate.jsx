import { useState, useEffect } from 'react';
import axios from 'axios';

function WorkoutDate({ workoutId, isEditing, onDateChange, onDateSaved }) {
  const [workoutData, setWorkoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDate, setEditingDate] = useState('');

  // Fetch only the specific workout data
  const fetchWorkoutData = async () => {
    if (!workoutId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch only the specific workout by ID
      const response = await axios.get(`http://127.0.0.1:8000/workouts/${workoutId}`);
      const workout = response.data;
      
      if (workout) {
        setWorkoutData(workout);
        console.log('Fetched specific workout data:', workout);
      } else {
        setError('Workout not found');
      }
    } catch (err) {
      console.error('Error fetching workout data:', err);
      setError('Failed to fetch workout data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or workoutId changes
  useEffect(() => {
    fetchWorkoutData();
  }, [workoutId]);

  // Fetch fresh data when exiting edit mode (when onDateSaved is called)
  useEffect(() => {
    if (!isEditing && onDateSaved) {
      console.log('Date editing finished, fetching fresh data for workout', workoutId);
      fetchWorkoutData();
    }
  }, [isEditing, onDateSaved, workoutId]);

  // Initialize editing date when entering edit mode
  useEffect(() => {
    if (isEditing && workoutData && !editingDate) {
      const dateString = workoutData.date || new Date().toISOString().split('T')[0];
      setEditingDate(dateString);
    } else if (!isEditing) {
      setEditingDate(''); // Clear editing state when not editing
    }
  }, [isEditing, workoutData, editingDate]);

  const handleDateChange = (event) => {
    const newDateString = event.target.value;
    setEditingDate(newDateString);
    
    const newDate = new Date(newDateString);
    onDateChange(newDate);
  };

  // Show loading state
  if (loading) {
    return (
      <div>
        <h1 style={{ fontStyle: 'italic', marginLeft: '5%', borderBottom: '1px solid #FFFFFF', width: '90%'}}>
          Loading...
        </h1>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <h1 style={{ fontStyle: 'italic', marginLeft: '5%', borderBottom: '1px solid #FFFFFF', width: '90%', color: 'red'}}>
          Error: {error}
        </h1>
      </div>
    );
  }

  // Show no data state
  if (!workoutData) {
    return (
      <div>
        <h1 style={{ fontStyle: 'italic', marginLeft: '5%', borderBottom: '1px solid #FFFFFF', width: '90%'}}>
          No workout data
        </h1>
      </div>
    );
  }

  // Get the date string for display
  const getDisplayDate = () => {
    if (isEditing) {
      return editingDate || workoutData.date || new Date().toISOString().split('T')[0];
    }
    return workoutData.date || new Date().toISOString().split('T')[0];
  };

  const displayDate = getDisplayDate();

  return (
    <div>
      {isEditing ? (
        <input
          type="date"
          value={displayDate}
          onChange={handleDateChange}
        />
      ) : (
        <h1 style={{ fontStyle: 'italic', marginLeft: '5%', borderBottom: '1px solid #FFFFFF', width: '90%'}}>
          {displayDate}
        </h1>
      )}
    </div>
  );
}

export default WorkoutDate;