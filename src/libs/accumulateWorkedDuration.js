import { DateTime, Duration } from 'luxon';

/**
 * 從一串代表打卡時間點的 DateTime[] 轉換成代表「已工作了多久」的 Duration
 *
 * @param {Luxon.DateTime[]} checkpoints 代表「開始工作」或「開始休息」的一連串工時紀錄點 DateTime，會被依序解
 *                                       釋為「開始工作」->「開始休息」->「開始工作」... 依此類推。
 *                                       如果工時紀錄點的長度是奇數的話（i.e. 最新紀錄點是「開始工作」），則會
 *                                       自動補上當下時間當成「開始休息」才計算。
 * @returns {Luxon.Duration} 已經工作了多久
 */
export function accumulateWorkedDuration({ checkpoints = [] }) {
  checkIncreasing(checkpoints);
  const checkpointsWithEnd = appendEndCheckpointIfNeed(checkpoints);

  const durations = [];
  let workStartedAt = null;

  checkpointsWithEnd.forEach(dt => {
    // 這筆是「開始工作時間」
    if (workStartedAt) {
      durations.push(dt.diff(workStartedAt))
      workStartedAt = null;

    // 這筆是「暫停工作時間」」
    } else {
      workStartedAt = dt;
    }
  })

  return sumDurations(durations);
}

function checkIncreasing(checkpoints) {
  let prev = null;
  checkpoints.forEach(dt => {
    if (prev && prev.toMillis() > dt.toMillis()) {
      throw new Error(`工時紀錄點們必須是嚴格遞增的 DateTime[]，但 ${dt} 後面卻接著 ${prev}`)
    }

    prev = dt;
  })
}

function appendEndCheckpointIfNeed(checkpoints) {
  return (checkpoints.length % 2 === 0) ?
    checkpoints :
    [...checkpoints, DateTime.local()];
}

function sumDurations(durations) {
  return durations.reduce(
    (dur1, dur2) => dur1.plus(dur2),
    Duration.fromMillis(0),
  );
}
