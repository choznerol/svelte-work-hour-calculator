import { DateTime } from 'luxon';
import _last from 'lodash/last';
import _first from 'lodash/first';
import tail from 'lodash/tail';
import initial from 'lodash/initial';
import chunk from 'lodash/chunk';
import { hhmm } from './formatLuxon';

/**
 *
 * @param {Checkpoint} checkpoints
 */
export function summarizeCheckpoints(checkpoints = []) {
  if (checkpoints.length < 2) return null;

  // 可理解為 [first, ...middles, last] = checkpoints
  const last = _last(checkpoints);
  const middles = initial(tail(checkpoints));
  const first = _first(checkpoints);

  let result = first.summary // E.g. '10:00開工'

  chunk(middles, 2).forEach(([pause, resume]) => {
    result += `, ${pause.summaryAsPeriod(resume)}` // E.g. ', 12:00~13:00吃飯'
  })

  result += `, ${last.summary}` // E.g. ', 18:00收工'
  return result;
}
