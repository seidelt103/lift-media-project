import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/WorkoutCards.css';

function WorkoutCards({ lifts }) {
  // Get unique workout IDs
  const workoutIds = [...new Set(lifts.map(lift => lift.fk_workout))];

  // Workout table details
  const [workouts, setWorkouts] = useState([]);

  // Fetch workout table details
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/workouts")
      .then(res => setWorkouts(res.data));
  }, []);

  return (
    <div className="cards">
      {workoutIds.map(workoutId => (
        <div className="overall-card" key={workoutId}>
          {/* Find date within workouts object based on id */}
          <h1 className="date-header">{workouts.find(w => w.WorkoutId === workoutId)?.date}</h1>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {/* Filter based on if lift workout id matches current one for card */}
              {lifts
                .filter(lift => lift.fk_workout === workoutId)
                .map(lift => (
                  <tr key={lift.LiftTemplateId}>
                    <td>{lift.name}</td>
                    <td>{lift.sets}</td>
                    <td>{lift.reps}</td>
                    <td>{lift.weight}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default WorkoutCards;