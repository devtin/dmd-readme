import { stripJsdocComment } from './strip-js-doc-comment'

const findComment = `/\\*\\*(?:\\\\\\n)?(.*?)\\n \\*/`

/**
 * Converts given `jsCode` into markdown by stripping jsDoc comments
 *
 * @param {String} jsCode
 * @return {string}
 */
export function jsCodeToMd (jsCode) {
  // return '`` `js\n' + jsCode + '\n```'
  // breakdown jsdoc comments (no need for JSdoc in tests at the end, right?)
  const pattern = new RegExp(findComment, 'msgi')
  return [
    '```js\n',
    jsCode.replace(pattern, (match, comment) => {
      // console.log({ match, comment })
      // return comment
      return '\n```\n\n' + stripJsdocComment(comment) + '\n\n```js\n'
    }),
    '\n```']
    .join('')
    .replace(/[\n]*```js\n\n```[\n]*/mgs, '\n\n')
    .replace(/```js[\n]+/g, '```js\n')
    .replace(/[\n]*```$/mgs, '\n```')
}
