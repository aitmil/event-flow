import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { getAllEvents, getEventById } from '../services/events.js';

export const getAllEventsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);

  const events = await getAllEvents({
    page,
    perPage,
    sortOrder,
    sortBy,
  });

  res.status(200).json({
    status: 200,
    message: 'Events fetched successfully!',
    data: events,
  });
};

export const getEventByIdController = async (req, res, next) => {
  const { eventId } = req.params;

  const event = await getEventById(eventId);

  if (!event) {
    return next(createHttpError(404, 'Event not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Event found successfully!',
    data: event,
  });
};
