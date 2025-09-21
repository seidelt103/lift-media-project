import { useState, useEffect } from "react";
import axios from "axios";
import "./css/AddWorkout.css";

function AddWorkout({ fetchData, onCancel }) {
  const endpoint = `${import.meta.env.VITE_API_URL}`;

  const [workoutDate, setWorkoutDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lifts, setLifts] = useState([]); // store added lifts
  const [isAddingLift, setIsAddingLift] = useState(false);
  const [newLift, setNewLift] = useState({ liftId: "", sets: "", reps: "", weight: "" });
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
    // find the selected lift name by ID
    const selectedLift = liftNames.find(l => l.id === Number(newLift.liftId));

    // store both liftId and display name in lifts[]
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

  const handleCancelLift = () => {
    setIsAddingLift(false);
  };

  const handleDeleteLift = (index) => {
    setLifts(lifts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create workout
      const workoutRes = await axios.post("http://127.0.0.1:8000/workouts", {
        date: workoutDate,
      });
      const workoutId = workoutRes.data.WorkoutId; // adjust if API uses 'id'

      // 2. Add lifts linked to this workout
      for (const lift of lifts) {
        await axios.post(`${endpoint}`, {  // endpoint should point to liftTemplate
          fk_workout_id: workoutId,
          lift_name_id: Number(lift.liftId),
          sets: Number(lift.sets),
          reps: Number(lift.reps),
          weight: Number(lift.weight),
        });
      }

      fetchData();
      setWorkoutDate(new Date().toISOString().split("T")[0]);
      setLifts([]);
      if (onCancel) onCancel();
    } finally {
      setIsSubmitting(false);
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
            {lifts.map((lift, index) => (
              <tr key={index}>
                <td>
                  {
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
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newLift.reps}
                    onChange={(e) =>
                      setNewLift({ ...newLift, reps: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newLift.weight}
                    onChange={(e) =>
                      setNewLift({ ...newLift, weight: e.target.value })
                    }
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
