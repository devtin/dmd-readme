import { name, version, author, license } from './package.json'

const banner = `/*!
 * ${ name } v${ version }
 * (c) 2019-${ new Date().getFullYear() } ${ author }
 * ${ license }
 */`

export default [
  {
    input: 'src/helper.js',
    output: [
      {
        file: `helper.js`,
        format: 'cjs',
        banner
      },
    ]
  }
]
