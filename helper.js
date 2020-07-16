/*!
 * dmd-readme v1.0.0
 * (c) 2019-2020 [object Object]
 * MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var schemaValidator = require('@devtin/schema-validator');
var pkgUp = _interopDefault(require('pkg-up'));
var fs = require('fs');
var deepListDir = require('deep-list-dir');
var lodash = require('lodash');
var avaToJson = require('ava-to-json');
var trim = _interopDefault(require('lodash/trim'));
var kebabCase_js = _interopDefault(require('lodash/kebabCase.js'));
var repeat_js = _interopDefault(require('lodash/repeat.js'));

function author (possibleAuthor) {
  if (typeof possibleAuthor === 'object') {
    return `${ possibleAuthor.name }${ possibleAuthor.email ? ' <a href="mailto:' + possibleAuthor.email + '">' + possibleAuthor.email + '</a>' : '' }`
  }

  return possibleAuthor
}

function packageJson () {
  return require(pkgUp.sync())
}

const { find } = schemaValidator.Utils;

function getRepositoryUrl () {
  let { repository } = packageJson();

  if (!repository) {
    return
  }

  repository = find(repository, 'url') || repository;
  if (!/https?:\/\//.test(repository)) {
    return
  }

  return repository.match(/https?:\/\/.+$/)[0].replace(/\.git$/, '')
}

const { find: find$1 } = schemaValidator.Utils;

// coerce with the package.json
const ConfigSchema = new schemaValidator.Schema({
  header: {
    image: {
      description: 'Image to be placed at the header',
      type: String,
      required: false
    },
    center: {
      description: 'Whether to center all of the header content or not (defaults to true when an image is present)',
      type: Boolean,
      default: !!find$1(packageJson(), 'config.readme.image')
    },
    title: {
      type: String,
      description: 'Title of the package (defaults to the package.json name value)',
      default ({ state }) {
        return state.pkg.name
      }
    },
    badges: {
      type: Array,
      description: 'Badges to add to the header (defaults to npm version, test github workflow and license)',
      default ({ state }) {
        const repositoryUrl = getRepositoryUrl(state.pkg.repository);
        return [
          `<a href="https://www.npmjs.com/package/${ state.pkg.name }" target="_blank"><img src="https://img.shields.io/npm/v/${ state.pkg.name }.svg" alt="Version"></a>`,
          repositoryUrl ? `<a href="${ repositoryUrl }/actions?query=workflow%3Atest"><img src="${ repositoryUrl }/workflows/test/badge.svg"></a>` : null,
          '<a href="http://opensource.org/licenses" target="_blank"><img src="http://img.shields.io/badge/License-MIT-brightgreen.svg"></a>', // MIT
        ].filter(Boolean)
      }
    }
  },
  installation: {
    description: `Whether to show or not an installation instructions automatically`,
    type: Boolean,
    default: true
  },
  installationDev: {
    description: `Whether to add the 'save in dev' flag to the installation instructions or not`,
    type: Boolean,
    default: false
  },
  features: {
    name: {
      description: `Features title`,
      type: String,
      default: 'Features'
    },
    titleLevel: {
      type: Number,
      default: 2
    },
    featureTitleLevel: {
      type: Number,
      default: 2
    },
    files: {
      description: `AVA test files which tests we want to transform into features`,
      type: Array,
      default () {
        return ['test/readme.test.js', 'test/features.test.js']
      }
    }
  },
  schemaTypes: {
    description: `Where to load schema types from`,
    type: Array,
    default () {
      return ['types/*.js']
    }
  }
});

const { find: find$2 } = schemaValidator.Utils;

const finalConfig = ConfigSchema.parse(find$2(packageJson(), 'config.readme') || {}, { state: { pkg: packageJson() } });

const { find: find$3 } = schemaValidator.Utils;

/**
 * Grabs configuration options
 * @function config
 * @param {string} path - The config path
 * @returns {*}
 */
function config (path) {
  return find$3(finalConfig, path)
}

/**
 * Loads AVA test files located `config.features`
 */
function features () {
  const testFiles = lodash.flattenDeep(finalConfig
    .features
    .files
    .map(testFilePattern => {
      return deepListDir.deepListDirSync(process.cwd(), { pattern: testFilePattern })
    }));

  return lodash.flatten(testFiles.map(found => {
    return found
  })
    .filter(fs.existsSync)
    .map(avaToJson.parseFileSync))
}

/**
 * Reads info from the package.json file.
 * @see [docs.hbs](docs.hbs) for an example of how to use this function
 *
 * @function pkg
 * @param {string} key - The package property you want returned
 * @returns {*}
 */

function pkg (key) {
  return packageJson()[key]
}

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

function prefixLines (string, replacer = '') {
  if (string) {
    return replacer + string.replace(/[\r\n]/g, '$&' + replacer)
  }
}

/**
 * Removes all asterisks and additional white spaces from JSDoc comments
 *
 * @param {String} jsDocCommentBlock
 * @param {String} replaceValue - Value with to replace comment blocks
 * @return {String} The comment without the asterisks
 *
 * @example
 *
 * ```js
 * const jsDocSyntax = `/**
 *  * A JSDoc description
 *  *
 *  * Hello
 *  **\/`
 *
 *  // => Outputs:
 *  // A JSDoc description
 *  //
 *  // Hello
 * ```
 */
function stripJsdocComment (jsDocCommentBlock, replaceValue = '') {
  return trim(jsDocCommentBlock.replace(/^ \* ?/mgsi, ''))
}

const findComment = `/\\*\\*(?:\\\\\\n)?(.*?)\\n \\*/`;

/**
 * Converts given `jsCode` into markdown by stripping jsDoc comments
 *
 * @param {String} jsCode
 * @return {string}
 */
function jsCodeToMd (jsCode) {
  // return '`` `js\n' + jsCode + '\n```'
  // breakdown jsdoc comments (no need for JSdoc in tests at the end, right?)
  const pattern = new RegExp(findComment, 'msgi');
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

exports.kebab = kebabCase_js;
exports.repeat = repeat_js;
exports.author = author;
exports.config = config;
exports.features = features;
exports.getRepositoryUrl = getRepositoryUrl;
exports.jsCodeToMd = jsCodeToMd;
exports.pkg = pkg;
exports.prefixLines = prefixLines;
exports.stripJsdocComment = stripJsdocComment;
