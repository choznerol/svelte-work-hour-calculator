import { hhmm } from './formatLuxon';

export class Checkpoint {
  constructor({ time, label }) {
    if (!time) throw `time is required to initialize Checkpoint, received ${time}`;
    if (!label) throw `label is required to initialize Checkpoint, received ${label}`;

    this._time = time;
    this._label = label;
  }

  /**
   * 轉為顯示用字串
   *
   * @returns {String} 例如 '10:00開工'
   */
  get summary() {
    return `${hhmm(this._time)}${this._label}`;
  }

  /**
   * 轉為顯示用字串，包含結束時間
   *
   * @param {Checkpoint} nextCheckpoint 代表自身的結束時間的另一個 Checkpoint
   * @returns {String} 例如 '12:00~13:00吃飯'
   */
  summaryAsPeriod(nextCheckpoint = null) {
    const endTime = nextCheckpoint ? hhmm(nextCheckpoint.time) : '??:??';
    return `${hhmm(this._time)}~${endTime}${this._label}`;
  }

  get time() {
    return this._time;
  }

  get label() {
    return this._label;
  }

  // set time(value) {
  //   return this._time = value;
  // }

  // set label(value) {
  //   return this._label = value;
  // }
}
