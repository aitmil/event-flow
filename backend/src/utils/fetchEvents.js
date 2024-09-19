import axios from 'axios';
import Event from '../db/models/event.js';
import { env } from './env.js';

const fetchEvents = async () => {
  try {
    const response = await axios.get(
      'https://app.ticketmaster.com/discovery/v2/events.json',
      {
        params: {
          apikey: env('TICKETMASTER_API_KEY'),
        },
      }
    );

    const events = response.data._embedded?.events || [];

    if (events.length) {
      for (const event of events) {
        const classifications = event.classifications || [];
        const classificationDetails = classifications
          .map(cls => {
            const genre = cls.genre?.name || 'Unknown Genre';
            const segment = cls.segment?.name || 'Unknown Segment';
            const subGenre = cls.subGenre?.name || 'Unknown SubGenre';
            return `${genre} (${segment}, ${subGenre})`;
          })
          .join(', ');

        const newEvent = new Event({
          title: event.name,
          image: event.images[0].url,
          description: classificationDetails || 'No description available',
          eventDate: event.dates.start.dateTime,
          organizer: event._embedded.venues[0]?.name || 'Unknown',
          url: event.url,
        });

        await newEvent.save();
      }
      console.log('Events fetched and stored in the database.');
    } else {
      console.log('No events found.');
    }
  } catch (error) {
    console.error('Error fetching events:', error.message);
  }
};

export default fetchEvents;
