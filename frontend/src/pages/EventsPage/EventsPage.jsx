import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Pagination } from 'antd';

import Loader from '../../components/Loader/Loader';
import EventsList from '../../components/EventsList/EventsList';
import { fetchEvents } from '../../api';
import css from './EventsPage.module.css';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        setIsLoading(true);
        const { events, totalItems } = await fetchEvents(page);
        setEvents(events);
        setTotalItems(totalItems);
        if (!events.length) {
          toast.error(
            'There are no events with this request. Please, try again'
          );
          return;
        }
      } catch {
        toast.error(
          'Whoops. Something went wrong! Please try to reload this page!'
        );
      } finally {
        setIsLoading(false);
      }
    };
    getAllEvents();
  }, [page]);

  return (
    <main className={css.container}>
      {isLoading && <Loader />}
      <EventsList events={events} />
      <Pagination
        current={page}
        total={totalItems}
        onChange={newPage => {
          setPage(newPage);
        }}
        showSizeChanger={false}
        style={{ textAlign: 'center', marginTop: '20px' }}
      />
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
