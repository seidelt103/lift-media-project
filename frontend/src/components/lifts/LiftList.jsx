import './css/LiftList.css';

function LiftList({ lifts }) {
  return (
    <div className="lift-list">
      {lifts.map(el => (
        <div className="lift-card" key={el.LiftTemplateId}>
          <div className="lift-title">{el.name}</div>
          <div className="lift-desc">{el.description}</div>
          <div className="lift-meta">
            <span>Sets: {el.sets}</span>
            <span>Reps: {el.reps}</span>
          </div>
          <div className="lift-dates">
            <span>Created: {el.created_at}</span>
            <span>Updated: {el.updated_at}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LiftList;