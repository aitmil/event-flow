import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const fetchEvents = async (page, sortBy, sortOrder) => {
  const response = await axios.get('/events', {
    params: {
      page: page,
      perPage: 12,
      sortOrder: sortOrder,
      sortBy: sortBy,
    },
  });
  return response.data.data;
};

export const registerParticipant = async (eventId, formData) => {
  const response = await axios.post(`/register/${eventId}`, formData);
  return response.data.data;
};

export const getParticipants = async eventId => {
  const response = await axios.get(`/participants/${eventId}`);
  return response.data.data;
};

export const getEventInfo = async eventId => {
  const response = await axios.get(`/events/${eventId}`);
  return response.data.data;
};
