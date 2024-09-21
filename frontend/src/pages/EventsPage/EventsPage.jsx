// import { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { Pagination, Select } from 'antd';

// import Loader from '../../components/Loader/Loader';
// import EventsList from '../../components/EventsList/EventsList';
// import { fetchEvents } from '../../api';
// import css from './EventsPage.module.css';

// const { Option } = Select;

// export default function EventsPage() {
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(1);
//   const [sortBy, setSortBy] = useState('eventDate');
//   const [sortOrder, setSortOrder] = useState('asc');

//   useEffect(() => {
//     const getAllEvents = async () => {
//       try {
//         setIsLoading(true);
//         const { events, totalItems } = await fetchEvents(
//           page,
//           sortBy,
//           sortOrder
//         );
//         setEvents(events);
//         setTotalItems(totalItems);
//         if (!events.length) {
//           toast.error(
//             'There are no events with this request. Please, try again'
//           );
//           return;
//         }
//       } catch {
//         toast.error(
//           'Whoops. Something went wrong! Please try to reload this page!'
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getAllEvents();
//   }, [page, sortBy, sortOrder]);

//   const handleSortByChange = value => {
//     setSortBy(value);
//     setPage(1);
//   };

//   const handleSortOrderChange = value => {
//     setSortOrder(value);
//     setPage(1);
//   };

//   return (
//     <main className={css.container}>
//       {isLoading && <Loader />}

//       <h1 className={css.header}>Upcoming Events</h1>

//       <div className={css.sort}>
//         <Select
//           defaultValue="eventDate"
//           onChange={handleSortByChange}
//           style={{ width: 180, marginRight: '10px' }}
//         >
//           <Option value="eventDate">Event Date</Option>
//           <Option value="title">Title</Option>
//           <Option value="organizer">Organizer</Option>
//         </Select>

//         <Select
//           defaultValue="asc"
//           onChange={handleSortOrderChange}
//           style={{ width: 180 }}
//         >
//           <Option value="asc">Ascending</Option>
//           <Option value="desc">Descending</Option>
//         </Select>
//       </div>

//       <EventsList events={events} />

//       <Pagination
//         current={page}
//         total={totalItems}
//         onChange={newPage => {
//           setPage(newPage);
//         }}
//         showSizeChanger={false}
//         className={css.pagination}
//       />

//       <Toaster
//         toastOptions={{
//           style: {
//             padding: '16px',
//             color: 'red',
//             marginTop: '135px',
//             textAlign: 'center',
//           },
//         }}
//       />
//     </main>
//   );
// }

import { useState, useEffect, useCallback, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Select } from 'antd';

import Loader from '../../components/Loader/Loader';
import EventsList from '../../components/EventsList/EventsList';
import { fetchEvents } from '../../api';
import css from './EventsPage.module.css';

const { Option } = Select;

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('eventDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        setIsLoading(true);
        const { events } = await fetchEvents(page, sortBy, sortOrder);

        setEvents(prevEvents => [...prevEvents, ...events]);
        setHasMore(events.length > 0);

        if (!events.length) {
          toast('No more events available!');
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
  }, [page, sortBy, sortOrder]);

  const handleSortByChange = value => {
    setSortBy(value);
    setPage(1);
    setEvents([]);
    setHasMore(true);
  };

  const handleSortOrderChange = value => {
    setSortOrder(value);
    setPage(1);
    setEvents([]);
    setHasMore(true);
  };

  const loadMoreRef = useCallback(
    node => {
      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <main className={css.container}>
      {isLoading && <Loader />}

      <h1 className={css.header}>Upcoming Events</h1>

      <div className={css.sort}>
        <Select
          value={sortBy}
          onChange={handleSortByChange}
          style={{ width: 180, marginRight: '10px' }}
        >
          <Option value="eventDate">Event Date</Option>
          <Option value="title">Title</Option>
          <Option value="organizer">Organizer</Option>
        </Select>

        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          style={{ width: 180 }}
        >
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>
      </div>

      <EventsList events={events} />

      <div ref={loadMoreRef} style={{ height: '20px' }} />

      {!hasMore && <p className={css.text}>No more events available.</p>}

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
