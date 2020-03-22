/**
 * From https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
 *
 * @param {String} str 要複製的文字內容
 */
export function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
