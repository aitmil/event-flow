import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'modern-normalize';
import Loader from './components/Loader/Loader';

const EventsPage = lazy(() => import('./pages/EventsPage/EventsPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ParticipantsPage = lazy(() =>
  import('./pages/ParticipantsPage/ParticipantsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/register/:eventId" element={<RegisterPage />} />
          <Route path="/participants/:eventId" element={<ParticipantsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
