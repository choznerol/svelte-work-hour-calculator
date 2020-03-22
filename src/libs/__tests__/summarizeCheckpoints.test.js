import { DateTime, Duration } from 'luxon';
import { summarizeCheckpoints } from '../summarizeCheckpoints.js';
import { Checkpoint } from '../../libs/Checkpoint.js';
import { hhmmToDateTime } from './helpers/hhmmToLuxon.js';
import { hhmmEachToDateTimes, hhmmToDuration } from './helpers/hhmmToLuxon.js';

/**
 * 測試 summarizeCheckpoints，Jest 輸出範例如下：
 *
 *   summarizeCheckpoints
 *  ✓ 如果訖今的活動為 ["工作"] ，則下個自動帶入的活動會是 吃飯 (1ms)
 *  ✓ 如果訖今的活動為 ["工作", "吃飯"] ，則下個自動帶入的活動會是 工作
 *  ...
 */
describe(`summarizeCheckpoints`, () => {
  test.each`
    labels                                              | expected
     ${['開工', '收工']}                                 | ${'10:00開工, 11:00收工'}
     ${['開工', '吃飯', '復工', '收工']}                   | ${'10:00開工, 11:00~12:00吃飯, 13:00收工'}
     ${['開工', '吃飯', '復工', '休息', '復工', '收工']}    | ${'10:00開工, 11:00~12:00吃飯, 13:00~14:00休息, 15:00收工'}
  `('如果訖今的活動為 $labels ，則 Summary 顯示為 $expected', ({ labels, expected }) => {
    const checkpoints = prepareInput(labels);
    const actual = summarizeCheckpoints(checkpoints);

    expect(actual).toEqual(expected);
  })
});

function prepareInput(labels) {
  let time = DateTime.fromObject({ hour: 10, minute: 0 }); // 10:00
  let step = Duration.fromObject({ hour: 1 });

  return labels.map((label) => {
    const checkpoint = new Checkpoint({ time, label });
    time = time.plus(step); // 10:00 -> 11:00 -> 12:00 ...
    return checkpoint;
  });
}
