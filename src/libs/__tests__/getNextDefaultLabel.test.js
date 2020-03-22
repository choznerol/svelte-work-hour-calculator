import { getNextDefaultLabel } from '../getNextDefaultLabel.js';
import { hhmmEachToDateTimes, hhmmToDuration } from './helpers/hhmmToLuxon.js';

/**
 * 測試 getNextDefaultLabel 的猜測行為，Jest 輸出範例如下：
 *
 *   getNextDefaultLabel
 *  ✓ 如果訖今的活動為 ["工作"] ，則下個自動帶入的活動會是 吃飯 (1ms)
 *  ✓ 如果訖今的活動為 ["工作", "吃飯"] ，則下個自動帶入的活動會是 工作
 *  ...
 */
describe(`getNextDefaultLabel`, () => {
  test.each`
    labels                                       | expected
     ${['開工']}                                  | ${'吃飯'}
     ${['開工', '吃飯']}                           | ${'復工'}
     ${['開工', '午餐']}                           | ${'復工'}
     ${['開工', '吃飯', '復工']}                    | ${'休息'}
     ${['開工', '吃飯', '復工', '休息']}             | ${'復工'}
     ${['開工', '吃飯', '復工', '休息', '復工']}      | ${'休息'}
  `('如果訖今的活動為 $labels ，則下個自動帶入的活動會是 $expected', ({ labels, expected }) => {
    const actual = getNextDefaultLabel({ labels });

    expect(actual).toEqual(expected);
  })
});
