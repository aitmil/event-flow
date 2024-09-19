import createHttpError from 'http-errors';
import {
  getParticipants,
  registerParticipant,
} from '../services/participants.js';

export const registerParticipantController = async (req, res, next) => {
  const { fullName, email, dateOfBirth, source } = req.body;

  const { eventId } = req.params;

  const participant = {
    fullName,
    email,
    dateOfBirth,
    source,
    eventId,
  };

  console.log(participant);
  const result = await registerParticipant(participant);

  res.status(201).json({
    status: 200,
    message: 'Participant of event registered successfully!',
    data: result,
  });
};

export const getParticipantsController = async (req, res, next) => {
  const eventId = req.params.eventId;

  const participants = await getParticipants(eventId);

  if (!participants) {
    return next(createHttpError(404, 'Participants not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Participants of event retrieved successfully!',
    data: participants,
  });
};
