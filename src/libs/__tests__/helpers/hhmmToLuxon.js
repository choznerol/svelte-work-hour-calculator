import { DateTime, Duration } from 'luxon';

// Parse '12:34' into Luxon.DateTime
export function hhmmToDateTime(hhmm) {
  const [hour, minute] = hhmm.split(':');
  return DateTime.fromObject({ hour, minute })
}

// Parse '12:34' into Luxon.Duration
export function hhmmToDuration(hhmm) {
  const [hour, minute] = hhmm.split(':');
  return Duration.fromObject({ hour, minute })
}

// Parse ['12:34', ...] into Luxon.DateTime[]
export function hhmmEachToDateTimes(hhmmArray) {
  return hhmmArray.map(hhmm => hhmmToDateTime(hhmm));
}
