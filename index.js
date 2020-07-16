/**
 * Pass the plug-in name to `jsdoc2md` or `dmd`:
 *
 * ```
 * jsdoc2md --plugin dmd-readme
 * ```
 *
 * This plugin is initially a fork from dmd-readable, which:
 * - removes global indexes
 * - places descriptions in block-quotes
 * - adds more whitespace before headings
 * - changes the delimiter for multiple types in param tables to a comma
 * - adds alias output
 *
 * @name Usage
 */
module.exports = function () {
  return {
    partial: __dirname + '/partials/**/*.hbs',
    helper: __dirname + '/helper.js'
  }
}
