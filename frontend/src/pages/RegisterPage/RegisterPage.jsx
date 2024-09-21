import { useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import RegisterContent from '../../components/RegisterContent/RegisterContent';
import css from './RegisterPage.module.css';

const RegistrationPage = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');

  return (
    <main className={css.container}>
      <Link to={backLinkHref.current} className={css.backLink}>
        <HiArrowLeft /> Go back
      </Link>
      <h1 className={css.header}>Event Registration</h1>
      <RegisterContent eventId={eventId} />
    </main>
  );
};

export default RegistrationPage;
