import { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { HiArrowLeft } from 'react-icons/hi';
import { Input } from 'antd';

import Loader from '../../components/Loader/Loader';
import ParticipantsList from '../../components/ParticipantsList/ParticipantsList';
import RegistrationChart from '../../components/RegistrationChart/RegistrationChart';
import { getParticipants, getEventInfo } from '../../api';
import css from './ParticipantsPage.module.css';

const { Search } = Input;

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [noParticipants, setNoParticipants] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [registrationsData, setRegistrationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { eventId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');

  useEffect(() => {
    const getAllParticipantsAndEventDetails = async () => {
      try {
        setIsLoading(true);

        const result = await getParticipants(eventId);
        setParticipants(result);
        setFilteredParticipants(result);
        setNoParticipants(result.length === 0);

        const eventResult = await getEventInfo(eventId);
        setEventInfo(eventResult);

        const dailyRegistrations = result.reduce((acc, participant) => {
          const registrationDate = participant.createdAt;

          if (registrationDate) {
            const date = new Date(registrationDate);
            const formattedDate = date.toISOString().split('T')[0];
            acc[formattedDate] = (acc[formattedDate] || 0) + 1;
          }
          return acc;
        }, {});

        const formattedData = Object.entries(dailyRegistrations).map(
          ([date, registrations]) => ({
            date,
            registrations,
          })
        );

        setRegistrationsData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(
          'Whoops. Something went wrong! Please try to reload this page!'
        );
      } finally {
        setIsLoading(false);
      }
    };

    getAllParticipantsAndEventDetails();
  }, [eventId]);

  const handleSearch = value => {
    const lowerCaseValue = value.toLowerCase();
    setFilteredParticipants(
      participants.filter(
        participant =>
          participant.fullName.toLowerCase().includes(lowerCaseValue) ||
          participant.email.toLowerCase().includes(lowerCaseValue)
      )
    );
  };

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <main className={css.container}>
      {isLoading && <Loader />}

      <Link to={backLinkHref.current} className={css.backLink}>
        <HiArrowLeft /> Go back
      </Link>

      <h1 className={css.header}>
        {eventInfo ? `"${eventInfo.title}" Participants` : 'Event Participants'}
      </h1>

      <Search
        placeholder="Search participants by name or email"
        onSearch={handleSearch}
        onChange={e => handleSearch(e.target.value)}
        className={css.search}
        size="large"
      />

      <div className={css.wrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <img
            className={css.img}
            src={eventInfo && eventInfo.image ? eventInfo.image : defaultImg}
            alt="poster"
            width={640}
          />
        )}

        {noParticipants ? (
          <p>No participants.</p>
        ) : (
          <ParticipantsList participants={filteredParticipants} />
        )}
      </div>

      <RegistrationChart data={registrationsData} />

      <Toaster
        toastOptions={{
          style: {
            padding: '16px',
            color: 'red',
            marginTop: '135px',
            textAlign: 'center',
          },
        }}
      />
    </main>
  );
}
