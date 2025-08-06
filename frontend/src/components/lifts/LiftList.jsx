import { useState } from 'react';
import axios from 'axios';
import './css/LiftList.css';

function LiftList({ lifts, fetchData }) {
  // Row being edited, represented by overall lift
  const [editingLiftId, setEditingLiftId] = useState(null);
  // Row values
  const [editedValues, setEditedValues] = useState({});
  const [deletingLiftId, setDeletingLiftId] = useState(null);

  const endpoint = `${import.meta.env.VITE_API_URL}`;

  const handleEdit = (liftId, currentLiftData) => {
    console.log("Edit clicked");
    // State change to edited row id
    setEditingLiftId(liftId);
    // Pass in current row data occurred when edit is clicked
    // Map the liftId of the row clicked and set the edited values to each proper column
    setEditedValues({
      [liftId]: {
        name: currentLiftData.name,
        sets: currentLiftData.sets,
        reps: currentLiftData.reps,
        weight: currentLiftData.weight
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
      sets: Number(editedValues[liftId].sets),
      reps: Number(editedValues[liftId].reps),
      weight: Number(editedValues[liftId].weight),
    };
    await axios.put(`${endpoint}/${liftId}`, updatedLift);
    fetchData(); // Refresh the data from backend
    setEditingLiftId(null);
    setEditedValues({});
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


  return (
    <div className="lifts">
      <table>
        <thead>
          <tr>
            {/* Hard coded for now, will need to pull headers from db later */}
            <th>Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Actions</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Reference the primary key LiftTemplateId from lift table */}
          {lifts.map((lift) => (
            <tr key={lift.LiftTemplateId}>
              {editingLiftId === lift.LiftTemplateId ? (
                // If matches editingLiftId, show edit inputs for row
                <>
                  <td>
                    <input
                      type="text"
                      value={editedValues[lift.LiftTemplateId]?.name ?? lift.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
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
                // Else show normal display for row
                <>
                  <td>{lift.name}</td>
                  <td>{lift.sets}</td>
                  <td>{lift.reps}</td>
                  <td>{lift.weight}</td>
                  <td id="action-btns">
                    <button id="edit-btn" onClick={() => handleEdit(lift.LiftTemplateId, lift)}>Edit</button>
                    <button type="button" id="delete-btn" onClick={() => handleDeleteClick(lift.LiftTemplateId)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default LiftList;