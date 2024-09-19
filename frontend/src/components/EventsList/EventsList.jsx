import EventItem from '../EventItem/EventItem';
import css from './EventsList.module.css';

export default function EventsList({ events }) {
  return (
    <ul className={css.list}>
      {events.map(event => (
        <li className={css.item} key={event.id}>
          <EventItem event={event} />
        </li>
      ))}
    </ul>
  );
}
