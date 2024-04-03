export const parseDate = (dateString) => {
  return new Date(dateString);
};

const getStartOfDayUTC = (date) => {
  const startOfDayUTC = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  return startOfDayUTC;
};

const getEndOfDayUTC = (date) => {
  const endOfDayUTC = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
  );
  return endOfDayUTC;
};

export const getDateRangeQuery = (date) => {
  const startOfDayUTC = getStartOfDayUTC(date);
  const endOfDayUTC = getEndOfDayUTC(date);

  return {
    $gte: startOfDayUTC,
    $lt: endOfDayUTC,
  };
};
