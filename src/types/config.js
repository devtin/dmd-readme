import { Schema, Utils } from '@devtin/schema-validator'
import { getRepositoryUrl } from '../helper/get-repository-url'
import { packageJson } from '../utils/package-json'

const { find } = Utils

// coerce with the package.json
export const ConfigSchema = new Schema({
  header: {
    image: {
      description: 'Image to be placed at the header',
      type: String,
      required: false
    },
    center: {
      description: 'Whether to center all of the header content or not (defaults to true when an image is present)',
      type: Boolean,
      default: !!find(packageJson(), 'config.readme.image')
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
        const repositoryUrl = getRepositoryUrl(state.pkg.repository)
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
})
