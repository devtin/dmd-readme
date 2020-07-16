import { existsSync } from 'fs'
import { deepListDirSync } from 'deep-list-dir'
import { flattenDeep, flatten } from 'lodash'
import { parseFileSync as parseAvaFileSync } from 'ava-to-json'
import { finalConfig } from '../utils/final-config'

/**
 * Loads AVA test files located `config.features`
 */
export function features () {
  const testFiles = flattenDeep(finalConfig
    .features
    .files
    .map(testFilePattern => {
      return deepListDirSync(process.cwd(), { pattern: testFilePattern })
    }))

  return flatten(testFiles.map(found => {
    return found
  })
    .filter(existsSync)
    .map(parseAvaFileSync))
}
