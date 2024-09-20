import { useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import css from './ParticipantsPage.module.css';

export default function ParticipantsPage() {
  const { eventId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');

  return (
    <main className={css.container}>
      <Link to={backLinkHref.current} className={css.backLink}>
        <HiArrowLeft /> Go back
      </Link>
      <h1 className={css.header}>Event Participants</h1>
      {/* <ParticipantsList eventId={eventId} /> */}
    </main>
  );
}
