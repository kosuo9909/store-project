import { IntlShape } from 'react-intl';

export const formatTimeElapsed = (date: Date | string, intl: IntlShape) => {
  const dateObject = new Date(date);
  const now = new Date();
  const timeElapsedInSeconds = Math.floor(
    (now.getTime() - dateObject.getTime()) / 1000,
  );

  if (timeElapsedInSeconds < 5) {
    return 'added just now';
  }
  if (timeElapsedInSeconds < 60) {
    return `added ${timeElapsedInSeconds} seconds ago`;
  }
  if (timeElapsedInSeconds < 3600) {
    return `added ${Math.floor(timeElapsedInSeconds / 60)} minutes ago`;
  }

  return `added on ${intl.formatDate(dateObject, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};
