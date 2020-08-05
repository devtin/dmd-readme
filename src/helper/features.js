import { existsSync } from 'fs'
import { deepListDirSync } from 'deep-list-dir'
import { flattenDeep, flatten } from 'lodash'
import { parseFileSync as parseAvaFileSync } from 'ava-to-json'
import { finalConfig } from '../utils/final-config'
import path from 'path'

/**
 * Loads AVA test files located `config.features`
 */
export function features () {
  const testFiles = flattenDeep(finalConfig
    .features
    .match
    .map(testFilePattern => {
      return deepListDirSync(path.resolve(process.cwd(), finalConfig.features.base), { pattern: testFilePattern })
    }))

  return flatten(testFiles
    .filter(existsSync)
    .map(parseAvaFileSync)
  )
}
