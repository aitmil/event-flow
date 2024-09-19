// import createHttpError from 'http-errors';
import Participant from '../db/models/participant.js';

export const registerParticipant = async participant => {
  //   const maybeParticipant = await Participant.find({ email: participant.email });

  //   if (maybeParticipant !== null)
  //     throw createHttpError(
  //       409,
  //       'You are already registered on this event with this email'
  //     );

  return await Participant.create(participant);
};

export const getParticipants = eventId => {
  return Participant.find({ eventId });
};
