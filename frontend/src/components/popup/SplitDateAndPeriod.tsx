export const getInternshipDateAndPeriod = (duration: string) => {
  const date = duration.match(/\d+/);
  const date_val = date ? parseInt(date[0], 10) : null;

  const period = duration.match(/[^\d]+/);
  const period_val = period ? period[0] : null;

  return { date_val, period_val };
};
