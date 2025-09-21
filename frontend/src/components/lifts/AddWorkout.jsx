import { useState, useEffect } from "react";
import axios from "axios";
import "./css/AddWorkout.css";

function AddWorkout({ fetchData, onCancel }) {
  const endpoint = `${import.meta.env.VITE_API_URL}`;

  const [workoutDate, setWorkoutDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Full lift structure
  const [lifts, setLifts] = useState([]); 

  const [isAddingLift, setIsAddingLift] = useState(false);
  
  // Newly added lift
  const [newLift, setNewLift] = useState({ liftId: "", sets: "", reps: "", weight: "" });

  // Look-table values
  const [liftNames, setLiftNames] = useState([]);

  // Fetch lift names from lookup table
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/liftnames")
      .then(res => setLiftNames(res.data));
  }, []);

  const handleDateChange = (e) => setWorkoutDate(e.target.value);

  const handleAddLiftClick = () => {
    setIsAddingLift(true);
    setNewLift({ liftId: "", sets: "", reps: "", weight: "" });
  };

  const handleSaveLift = () => {
    // Find the selected lift name by ID
    const selectedLift = liftNames.find(l => l.id === Number(newLift.liftId));

    // Store both liftId and display name in lifts state array
    setLifts([
      ...lifts,
      {
        liftId: newLift.liftId,
        name: selectedLift ? selectedLift.name : "",
        sets: newLift.sets,
        reps: newLift.reps,
        weight: newLift.weight,
      }
    ]);
    setIsAddingLift(false);
  };

  // When cancel is clicked when adding a lift
  const handleCancelLift = () => {
    setIsAddingLift(false);
  };

  // Passes in index for lift we want to delete
  const handleDeleteLift = (index) => {
    /* _ is current element, keep element in lifts only if index i is not equal to "index"
    we want to delete */
    setLifts(lifts.filter((_, i) => i !== index));
  };

  // When Add Workout is clicked on card
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      /* Create workout (for some reason this works, but workoutRes value is never read: 
      it returns "Added Succesfully" so technically it doesn't need to be read) */
      const workoutRes = await axios.post("http://127.0.0.1:8000/workouts", {
        date: workoutDate,
      });
      
      // Get the latest workout ID by fetching all workouts
      const workoutsRes = await axios.get("http://127.0.0.1:8000/workouts");
      const workouts = workoutsRes.data;
      
      // Find the workout with the matching date (or get the latest if dates aren't unique)
      const latestWorkout = workouts.find(w => w.date === workoutDate) || workouts[workouts.length - 1];

      // Get id of matching workout that was just created or latest workout
      const workoutId = latestWorkout?.WorkoutId;
      
      if (!workoutId) {
        throw new Error('Could not get workout ID after creation');
      }

      // Add lifts to liftTemplate with associated workout id
      for (const lift of lifts) {
        const addedLift = {
          lift_name: Number(lift.liftId),  // Same as WorkoutCards
          sets: Number(lift.sets) || 0,
          reps: Number(lift.reps) || 0,
          weight: Number(lift.weight) || 0,
          fk_workout: Number(workoutId),  // Same as WorkoutCards
        };

        await axios.post(`${endpoint}`, addedLift);
      }

      fetchData();

      // Reset workout date state to current date
      setWorkoutDate(new Date().toISOString().split("T")[0]);

      // Reset lifts array associated with this component being Add Workout card
      setLifts([]);
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error adding workout:', error);
      alert('Failed to add workout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overall-card add-workout-card">
      <form onSubmit={handleSubmit}>
        <h1>Add New Workout</h1>

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

        {/* --- Lifts Table --- */}
        <table className="lifts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Normal display of lifts in Add Workout mode */}
            {lifts.map((lift, index) => (
              <tr key={index}>
                <td>
                  {
                    /* Iterates through and gets the matching lift name associated with the id of the lift
                    from the lookup table */
                    liftNames.find((ln) => ln.id === Number(lift.liftId))
                      ?.name || "Unknown"
                  }
                </td>
                <td>{lift.sets}</td>
                <td>{lift.reps}</td>
                <td>{lift.weight}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeleteLift(index)}
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* When Add Lift button is clicked */}
            {isAddingLift && (
              <tr>
                <td>
                  <select
                    value={newLift.liftId}
                    onChange={(e) =>
                      setNewLift({ ...newLift, liftId: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a lift</option>
                    {liftNames.map((lift) => (
                      <option key={lift.id} value={lift.id}>
                        {lift.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={newLift.sets}
                    onChange={(e) =>
                      setNewLift({ ...newLift, sets: e.target.value })
                    }
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newLift.reps}
                    onChange={(e) =>
                      setNewLift({ ...newLift, reps: e.target.value })
                    }
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newLift.weight}
                    onChange={(e) =>
                      setNewLift({ ...newLift, weight: e.target.value })
                    }
                    required
                  />
                </td>
                <td>
                  <button type="button" onClick={handleSaveLift}>
                    Save
                  </button>
                  <button type="button" onClick={handleCancelLift}>
                    Cancel
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {!isAddingLift && (
          <button
            type="button"
            onClick={handleAddLiftClick}
            disabled={isSubmitting}
          >
            Add Lift
          </button>
        )}

        {/* Save and Cancel buttons on Add Workout card */}
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} id="card-done-btn">
            {isSubmitting ? "Saving..." : "Save Workout"}
          </button>
          <button
            type="button"
            onClick={onCancel}
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