import pkgUp from 'pkg-up'

export function packageJson () {
  return require(pkgUp.sync())
}
