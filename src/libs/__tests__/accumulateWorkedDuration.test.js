import { Settings, DateTime, Duration } from 'luxon';
import { accumulateWorkedDuration } from '../accumulateWorkedDuration.js';
import { hhmmEachToDateTimes, hhmmToDuration } from './helpers/hhmmToLuxon.js';

// mocks 當下時間為 17:42
const NOW = DateTime.fromObject({ hour: 17, minute: 42 });
Settings.now = () => NOW.toMillis();

/**
 * 測試各種工時紀錄點算出來的累計工時，Jest 輸出範例如下：
 *
 *   workedDuration（假設在 17:42 呼叫）
 *  ✓ 當工時紀錄點為 ["10:00"] ，則累計工時為 7:42
 *  ✓ 當工時紀錄點為 ["10:00", "18:00"] ，則累計工時為 8:00
 *  ...
 */
describe(`workedDuration（假設在 ${NOW.toLocaleString(DateTime.TIME_24_SIMPLE)} 呼叫）`, () => {
  test.each`
    checkpoints                                      | workedDuration
    ${ ['10:00'] /* 17:42 */ }                       |  ${ '7:42' }
    ${ ['10:00', '18:00'] }                          |  ${ '8:00' }
    ${ ['10:00', '12:00', '13:00' /* 17:42 */] }     |  ${ '6:42' }
    ${ ['10:00', '12:00', '13:00', '18:00'] }        |  ${ '7:00' }
    ${ [] }                                          |  ${ '0:00' }
  `('當工時紀錄點為 $checkpoints ，則累計工時為 $workedDuration', ({ checkpoints, workedDuration }) => {
    const actual = accumulateWorkedDuration({ checkpoints: hhmmEachToDateTimes(checkpoints) }).toFormat('hh:mm');
    const expected = hhmmToDuration(workedDuration).toFormat('hh:mm');

    expect(actual).toEqual(expected);
  })

  describe('錯誤的輸入值', () => {
    test('輸入非遞增的間工時紀錄點，報錯「工時紀錄點們必須是嚴格遞增」', () => {
      const badInput = hhmmEachToDateTimes(['10:09', '10:08'])

      expect(() => {
        accumulateWorkedDuration({ checkpoints: badInput });
      }).toThrowError(/工時紀錄點們必須是嚴格遞增/)
    })
  })
});
