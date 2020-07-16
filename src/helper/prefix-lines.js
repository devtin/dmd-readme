/**
 * Prefixes a string to the beginning of each line in the first string
 *
 * @function prefixLines
 *
 * @param {string} string - The string to modify
 * @param {string} replacer - The string to prefix to each line
 *
 * @returns {string}
 */

export function prefixLines (string, replacer = '') {
  if (string) {
    return replacer + string.replace(/[\r\n]/g, '$&' + replacer)
  }
}
