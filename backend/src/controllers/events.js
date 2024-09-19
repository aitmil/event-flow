import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { getAllEvents } from '../services/events.js';

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
