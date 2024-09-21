export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const parseSortOrder = sortOrder => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = sortBy => {
  const keyOfContact = ['title', 'eventDate', 'organizer'];

  if (keyOfContact.includes(sortBy)) return sortBy;

  return 'eventDate';
};

export const parseSortParams = query => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
