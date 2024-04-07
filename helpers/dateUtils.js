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
  return new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
};

export const getLastDayOfMonth = (year, month) => {
  return new Date(Date.UTC(year, month, 0, 23, 59, 59)).getUTCDate();
};

export const getEndOfMonth = (year, month) => {
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = nextMonth === 1 ? year + 1 : year;
  const lastDayOfMonth = new Date(Date.UTC(nextYear, nextMonth - 1, 0));
  lastDayOfMonth.setUTCHours(23, 59, 59, 999);
  return lastDayOfMonth;
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
