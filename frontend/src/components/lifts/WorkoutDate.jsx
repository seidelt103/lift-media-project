import { useState, useEffect } from 'react';

/* Note: date, isEditing, and onDateChange are props in React,
parent component would be WorkoutCards, child component is WorkoutDate */
function WorkoutDate({ date, isEditing, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date(date));

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setCurrentDate(newDate);
    // Call the parent's callback to update the workout data
    onDateChange(newDate);
  };

  // Update local state when the prop changes (when done is clicked)
  useEffect(() => {
    setCurrentDate(new Date(date));
  }, [date]); // Not sure what the second date call is for

  return (
    <div>
      {isEditing ? (
        <input
          type="date"
          // Takes in input date as YYYY-MM-DD value
          value={currentDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
        />
      ) : (
        // Converts to YYYY-MM-DD form
        <h1 style={{ fontStyle: 'italic', marginLeft: '5%', borderBottom: '1px solid #FFFFFF', width: '90%'}}>{currentDate.toISOString().split('T')[0]}</h1>
      )}
    </div>
  );
}

export default WorkoutDate;
