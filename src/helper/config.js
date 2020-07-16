import { Utils } from '@devtin/schema-validator'
import { finalConfig } from '../utils/final-config'

const { find } = Utils

/**
 * Grabs configuration options
 * @function config
 * @param {string} path - The config path
 * @returns {*}
 */
export function config (path) {
  return find(finalConfig, path)
}
