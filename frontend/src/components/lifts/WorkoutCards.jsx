import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/WorkoutCards.css';

function WorkoutCards({ lifts }) {
  // Get unique workout IDs
  const workoutIds = [...new Set(lifts.map(lift => lift.fk_workout))];

  return (
    <div className="cards">
      {workoutIds.map(workoutId => (
        <div key={workoutId}>
          <table border="1">
            <caption>Workout {workoutId}</caption>
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