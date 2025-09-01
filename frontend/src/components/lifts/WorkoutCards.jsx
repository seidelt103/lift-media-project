import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/WorkoutCards.css';
import WorkoutDate from './WorkoutDate';
import AddLift from './AddLift';

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

  const [deletingLiftId, setDeletingLiftId] = useState(null);

  const [deletingWorkoutId, setDeletingWorkoutId] = useState(null);

  /* State for temporary date change when date is edited (will include simultaneous
  edits, need to make it so only one workout card can be edited at a time) */
  const [tempWorkoutDates, setTempWorkoutDates] = useState({});

  // Add row state
  const [newRowData, setNewRowData] = useState({});
  const [showingAddRow, setShowingAddRow] = useState({});

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

  const handleDelete = async (liftId) => {
    await axios.delete(`${endpoint}/${liftId}`);
    // Refresh data
    fetchData();
  };

  // Delete confirmed
  const handleDeleteClick = (liftId) => {
    setDeletingLiftId(liftId);
  };

  // Delete cancelled
  const handleCancelDelete = () => {
    setDeletingLiftId(null);
  };

  // Function to handle date changes from WorkoutDate component
  const handleWorkoutDateChange = (workoutId, newDate) => {
    /* Will set the associated workout in tempWorkoutDates to new input date,
    keeps all the other previous data unchanged */
    setTempWorkoutDates(prev => ({
      ...prev,
      [workoutId]: newDate
    }));
  };

  // Function to save the workout when Done is clicked
  const handleWorkoutDone = async (workoutId) => {
    const tempDate = tempWorkoutDates[workoutId];

    // Update Workouts table with new date
    if (tempDate) {
      await axios.put(`http://127.0.0.1:8000/workouts`, {
        WorkoutId: workoutId,
        date: tempDate.toISOString().split('T')[0]
      });

      // Update only the associated edited workout's date in workout table state
      setWorkouts(prev => prev.map(workout =>
        workout.WorkoutId === workoutId
          ? { ...workout, date: tempDate }
          : workout
      ));

      // Clear the temporary date for the associated edited workout date
      setTempWorkoutDates(prev => {
        const newTemp = { ...prev };
        delete newTemp[workoutId];
        return newTemp;
      });
    }

    // Reset editing workout state
    setEditingWorkoutId(null);
  };

  // Add row functions
  const handleShowAddRow = (workoutId) => {
    setShowingAddRow(prev => ({
      ...prev,
      [workoutId]: true
    }));

    setNewRowData(prev => ({
      ...prev,
      [workoutId]: {
        exercise: '',
        sets: '',
        reps: '',
        weight: '',
      }
    }));
  };

  const handleNewRowChange = (workoutId, field, value) => {
    setNewRowData(prev => ({
      ...prev,
      [workoutId]: {
        ...prev[workoutId],
        [field]: value
      }
    }));
  };

  const handleSaveNewRow = async (workoutId) => {
    const rowData = newRowData[workoutId];

    if (!rowData || !rowData.exercise) {
      alert('Please fill in at least the exercise name');
      return;
    }

    try {

      const addedLift = {
        lift_name: Number(rowData.exercise),
        sets: Number(rowData.sets) || 0,
        reps: Number(rowData.reps) || 0,
        weight: Number(rowData.weight) || 0,
        fk_workout: Number(workoutId),
      };

      await axios.post(`${endpoint}`, addedLift);

      // Refresh the data from backend so newly added lift appears instantly
      fetchData();

      // Used here as a reset to clear and hide the add lift row once lift is submitted
      handleCancelAddRow(workoutId);

    } catch (error) {
      console.error('Error adding new exercise:', error);
      alert('Failed to add exercise. Please try again.');
    }
  };

  const handleCancelAddRow = (workoutId) => {

    // Hides the added lift row
    setShowingAddRow(prev => {
      const newState = { ...prev };
      delete newState[workoutId];
      return newState;
    });

    // Clears the form data
    setNewRowData(prev => {
      const newState = { ...prev };
      delete newState[workoutId];
      return newState;
    });
  };

  const handleWorkoutDelete = async (workoutId) => {
    await axios.delete(`http://127.0.0.1:8000/workouts/${workoutId}/`);
    // Refresh data
    fetchData();
  }

  const handleWorkoutDeleteClick = (workoutId) => {
    if (window.confirm("Do you want to delete this workout?")) {
      handleWorkoutDelete(workoutId);
    }
  };

  return (
    <div className="cards">

      {/* Put add workout card here, should fit within display grid CSS */}

      {/* Each Workout Id maps to a different workout */}
      {workoutIds.map(workoutId => (
        <div className="overall-card" key={workoutId}>
          <WorkoutDate
            date={workouts.find(w => w.WorkoutId === workoutId)?.date}
            isEditing={editingWorkoutId === workoutId}
            onDateChange={(newDate) => handleWorkoutDateChange(workoutId, newDate)}
          />
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
                    ) : deletingLiftId === lift.LiftTemplateId ? (
                      // Else if matches deleteLiftId, show delete confirmation
                      <>
                        <td colSpan={4}>Are you sure you want to delete lift?</td>
                        <td>
                          <button onClick={() => handleDelete(lift.LiftTemplateId)}>Confirm</button>
                          <button onClick={handleCancelDelete}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      // Normal display with conditional edit button
                      <>
                        <td>{lift.name}</td>
                        <td>{lift.sets}</td>
                        <td>{lift.reps}</td>
                        <td>{lift.weight}</td>
                        <td id="action-btns">
                          {/* Only shows when current workout card is in edit mode */}
                          {editingWorkoutId === workoutId && (
                            <button id="edit-btn" onClick={() => handleEdit(lift.LiftTemplateId, lift)}>Edit</button>
                          )}
                          {editingWorkoutId === workoutId && (
                            <button type="button" id="delete-btn" onClick={() => handleDeleteClick(lift.LiftTemplateId)}>Delete</button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              {/* AddRow component */}
              {showingAddRow[workoutId] && (
                <AddLift
                  workoutId={workoutId}
                  onSave={handleSaveNewRow}
                  onCancel={handleCancelAddRow}
                  onChange={handleNewRowChange}
                  data={newRowData[workoutId]}
                  liftNames={liftNames}
                />
              )}
            </tbody>
          </table>
          {/* Workout card edit button */}
          {editingWorkoutId === workoutId ? (
            <>
              <div class="add-lift">
                <button id="card-done-btn" onClick={() => handleShowAddRow(workoutId)}>
                  Add Lift
                </button>
              </div>

              <div class="done-btn">
                <button id="card-done-btn" onClick={() => handleWorkoutDone(workoutId)}>
                  Done
                </button>
              </div>
            </>
          ) : (
            <>
              <button id="card-edit-btn" onClick={() => setEditingWorkoutId(workoutId)}>
                Edit
              </button>
              <button id="card-delete-btn" onClick={() => handleWorkoutDeleteClick(workoutId)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))
      }
    </div >
  );
}

export default WorkoutCards;