function AddLift({workoutId, onSave, onCancel, onChange, data, liftNames}) {
  return (
    <tr className="add-row">
      <td>
        <select
          value={data?.exercise ?? ''}
          onChange={(e) => onChange(workoutId, 'exercise', e.target.value)}
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
          value={data?.sets ?? ''}
          onChange={(e) => onChange(workoutId, 'sets', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={data?.reps ?? ''}
          onChange={(e) => onChange(workoutId, 'reps', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={data?.weight ?? ''}
          onChange={(e) => onChange(workoutId, 'weight', e.target.value)}
        />
      </td>
      <td>
        <button 
          className="save-btn"
          onClick={() => onSave(workoutId)}
        >
          Save
        </button>
        <button 
          className="cancel-btn"
          onClick={() => onCancel(workoutId)}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default AddLift;