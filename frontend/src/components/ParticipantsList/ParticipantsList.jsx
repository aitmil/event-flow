import css from './ParticipantsList.module.css';

export default function ParticipantsList({ participants }) {
  return (
    <ul className={css.list}>
      {participants.map(participant => (
        <li className={css.item} key={participant._id}>
          <h3 className={css.name}>{participant.fullName}</h3>
          <p className={css.email}>{participant.email}</p>
        </li>
      ))}
    </ul>
  );
}
