import { packageJson } from '../utils/package-json'
import { Utils } from '@devtin/schema-validator'

const { find } = Utils

export function getRepositoryUrl () {
  let { repository } = packageJson()

  if (!repository) {
    return
  }

  repository = find(repository, 'url') || repository
  if (!/https?:\/\//.test(repository)) {
    return
  }

  return repository.match(/https?:\/\/.+$/)[0].replace(/\.git$/, '')
}
