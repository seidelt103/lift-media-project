import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/WorkoutCards.css';

function WorkoutCards({ lifts, fetchData }) {

  const endpoint = `${import.meta.env.VITE_API_URL}`;

  // Get unique workout IDs
  const workoutIds = [...new Set(lifts.map(lift => lift.fk_workout))];

  // Workout table details
  const [workouts, setWorkouts] = useState([]);

  // Workout card being edited
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);

  // Row being edited
  const [editingLiftId, setEditingLiftId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  // For lift name select dropdown box
  const [liftNames, setLiftNames] = useState([]);
  const [selectedLift, setSelectedLift] = useState('');

  /* Fetch workout table details, must be in this format so fetchData can be passed 
  in, if put in other form then fetchData cannot be passed in since it is called already, 
  no refresh will be applied */
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/workouts").then(res => setWorkouts(res.data));
  }, []);


  // Fetch lift names from lookup table
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/liftnames")
      .then(res => setLiftNames(res.data));
  }, []);

  const handleEdit = (liftId, currentLiftData) => {
    // State change to edited row id
    setEditingLiftId(liftId);
    // Pass in current row data occurred when edit is clicked
    // Map the liftId of the row clicked and set the edited values to each proper column
    setEditedValues({
      [liftId]: {
        lift_name: currentLiftData.lift_name,
        sets: currentLiftData.sets,
        reps: currentLiftData.reps,
        weight: currentLiftData.weight,
        /* Include this since JSON format requires it, but don't allow option to change it
        Maybe implement option to change it later on edit but ideally they will be all in their same
        workout cards/components so user won't need to edit the id, the way it's implemented now is
        just as an initial way to associate lifts with individual workouts */
        fk_workout: currentLiftData.fk_workout
      }
    });
  };

  // Takes in new input values when they are typed in on edit
  const handleInputChange = (e, fieldName) => {
    // ... is shallow copy being made for editedValues
    setEditedValues({
      [editingLiftId]: {
        ...editedValues[editingLiftId],
        [fieldName]: e.target.value,
      }
    });
  };

  // When save is clicked, ternary used, sets new row (lift) values if new values are input, if not returns original row
  const handleSaveClick = async (liftId) => {
    // Packages data to be sent to backend in JSON format
    const updatedLift = {
      LiftTemplateId: liftId,
      ...editedValues[liftId],
      lift_name: selectedLift,
      sets: Number(editedValues[liftId].sets),
      reps: Number(editedValues[liftId].reps),
      weight: Number(editedValues[liftId].weight),
      // Must be included, but have no option to change it on edit
      fk_workout: Number(editedValues[liftId].fk_workout)
    };
    await axios.put(`${endpoint}/${liftId}`, updatedLift);
    // Refresh the data from backend
    fetchData();
    setEditingLiftId(null);
    setEditedValues({});
    setSelectedLift('');
  };

  // Cancel button functionality
  const handleCancelClick = () => {
    setEditingLiftId(null);
    setEditedValues({});
  };

  return (
    <div className="cards">
      {/* Each Workout Id maps to a different workout */}
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
                {/* Only show action header when editing workout */}
                {editingWorkoutId === workoutId && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {/* Filters lifts array to only include ones with workout ids matching the current iteration,
              will then map each of those lifts pertaining to the specific workout to individual lift rows */}
              {lifts
                .filter(lift => lift.fk_workout === workoutId)
                .map(lift => (
                  <tr key={lift.LiftTemplateId}>
                    {editingLiftId === lift.LiftTemplateId ? (
                      // If this specific lift is being edited, show edit inputs
                      <>
                        <td>
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
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editedValues[lift.LiftTemplateId]?.sets ?? lift.sets}
                            onChange={(e) => handleInputChange(e, 'sets')}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editedValues[lift.LiftTemplateId]?.reps ?? lift.reps}
                            onChange={(e) => handleInputChange(e, 'reps')}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editedValues[lift.LiftTemplateId]?.weight ?? lift.weight}
                            onChange={(e) => handleInputChange(e, 'weight')}
                          />
                        </td>
                        <td>
                          <button onClick={() => handleSaveClick(lift.LiftTemplateId)}>Save</button>
                          <button onClick={handleCancelClick}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      // Normal display with conditional edit button
                      <>
                        <td>{lift.name}</td>
                        <td>{lift.sets}</td>
                        <td>{lift.reps}</td>
                        <td>{lift.weight}</td>
                        <td>
                          {/* Only shows when current workout card is in edit mode */}
                          {editingWorkoutId === workoutId && (
                            <button onClick={() => handleEdit(lift.LiftTemplateId, lift)}>
                              Edit
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Workout card edit button */}
          {editingWorkoutId === workoutId ? (
            <button
              id="card-done-btn"
              onClick={() => setEditingWorkoutId(null)}
            >
              Done
            </button>
          ) : (
            <button
              id="card-edit-btn"
              onClick={() => setEditingWorkoutId(workoutId)}
            >
              Edit
            </button>
          )}
        </div>
      ))
      }
    </div >
  );
}

export default WorkoutCards;