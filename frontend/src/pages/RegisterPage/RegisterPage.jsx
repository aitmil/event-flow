// RegistrationPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import RegisterContent from '../../components/RegisterContent';

const RegistrationPage = () => {
  const { eventId } = useParams(); // Get event ID from URL parameters

  return (
    <div>
      <h1>Event Registration</h1>
      <RegisterContent eventId={eventId} />
    </div>
  );
};

export default RegistrationPage;
