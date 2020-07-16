import { ConfigSchema } from '../types/config'
import { packageJson } from './package-json'
import { Utils } from '@devtin/schema-validator'

const { find } = Utils

export const finalConfig = ConfigSchema.parse(find(packageJson(), 'config.readme') || {}, { state: { pkg: packageJson() } })
