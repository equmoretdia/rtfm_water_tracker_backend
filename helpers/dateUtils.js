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

export const getStartOfMonth = (year, month) => {
  return new Date(year, month - 1, 1);
};

export const getLastDayOfMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getMonthName = (month) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
};
