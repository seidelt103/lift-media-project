import './css/LiftList.css';

function LiftList({ lifts }) {
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
                    {/* Add more headers as needed */}
                </tr>
            </thead>
            <tbody>
                {lifts.map(lift => (
                    <tr key={lift.id}> {/* Use a unique key for each row */}
                        <td>{lift.name}</td>
                        <td>{lift.sets}</td>
                        <td>{lift.reps}</td>
                        <td>{lift.weight}</td>
                        {/* Add more cells as needed */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default LiftList;