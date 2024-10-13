import { SORT_ORDER } from '../utils/parseSortParams.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import Event from '../db/models/event.js';
import dayjs from 'dayjs';

export const getAllEvents = async ({
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'eventDate',
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const today = dayjs().startOf('day').toDate();

  const eventsQuery = Event.find({
    eventDate: { $gte: today },
  });

  const sortingCriteria = { [sortBy]: sortOrder };

  const [events, count] = await Promise.all([
    eventsQuery.sort(sortingCriteria).skip(skip).limit(limit).exec(),
    Event.countDocuments({ eventDate: { $gte: today } }),
  ]);

  const paginationData = calculatePaginationData(count, perPage, page);

  return {
    events,
    ...paginationData,
  };
};

export const getEventById = eventId => {
  return Event.findById(eventId);
};
