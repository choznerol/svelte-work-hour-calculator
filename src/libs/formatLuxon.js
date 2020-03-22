import { DateTime, Duration } from 'luxon';

/**
 * @param {Luxon.DateTime|Luxon.Duration} luxon 要被 format 的 Luxon 型別
 * @returns {String} 格式為 hh:mm 的字串
 */
export function hhmm(luxon) {
  if (luxon instanceof DateTime) {
    return luxon.toLocaleString(DateTime.TIME_24_SIMPLE);
  } else if (luxon instanceof Duration) {
    return luxon.toFormat('hh:mm');
  } else {
    return '??:??'
  }
}

/**
 * @param {Luxon.DateTime|Luxon.Duration} luxon 要被 format 的 Luxon 型別
 * @returns {String} 格式為 hh:mm:ss 的字串
 */
export function hhmmss(luxon) {
  if (luxon instanceof DateTime) {
    return luxon.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
  } else if (luxon instanceof Duration) {
    return luxon.toFormat('hh:mm:ss');
  } else {
    return '??:??:??'
  }
}
