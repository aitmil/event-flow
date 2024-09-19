import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const fetchEvents = async page => {
  const response = await axios.get('/events', {
    params: {
      page: page,
      perPage: 12,
    },
  });
  return response.data.data;
};

export const registerParticipant = async (eventId, formData) => {
  const response = await axios.post(`/register/${eventId}`, formData);
  return response.data.data;
};
