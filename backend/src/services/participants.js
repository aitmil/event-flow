import Participant from '../db/models/participant.js';

export const registerParticipant = participant => {
  return Participant.create(participant);
};

export const getParticipants = eventId => {
  return Participant.find({ eventId });
};
