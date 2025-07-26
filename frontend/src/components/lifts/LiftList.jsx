function LiftList({ lifts }) {
  return (
    <ul>
      {lifts.map(el => (
        <li key={el.LiftTemplateId}>
          {el.LiftTemplateId} {el.name} {el.description} | {el.created_at} | {el.updated_at} | {el.sets} | {el.reps}
        </li>
      ))}
    </ul>
  );
}

export default LiftList;