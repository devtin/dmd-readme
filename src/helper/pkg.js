import { packageJson } from '../utils/package-json.js'

/**
 * Reads info from the package.json file.
 * @see [docs.hbs](docs.hbs) for an example of how to use this function
 *
 * @function pkg
 * @param {string} key - The package property you want returned
 * @returns {*}
 */

export function pkg (key) {
  return packageJson()[key]
}
