import last from 'lodash/last';

/**
 * 根據截至目前為止的活動們，猜出下一個活動是「工作」、「吃飯」還是「休息」
 *
 * @param {String[]} labels 截至目前為止的活動們
 * @returns {'工作'|'吃飯'|'休息'} 猜測的下一個活動
 */
export function getNextDefaultLabel({ labels }) {
  if (!`${last(labels)}`.match(/工/)) {
    return '復工';
  }

  // 到現在吃過幾次飯了？
  const ateTimes = labels.filter(label => label.match(/吃|餐/)).length;

  // 如果還沒吃過飯，猜你要吃飯
  // TODO: 可輸入 checkpoints 進一步智能猜測「午餐」或「晚餐」XD
  if (ateTimes === 0) {
    return '吃飯';
  }

  return '休息';
}
