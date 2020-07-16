export function author (possibleAuthor) {
  if (typeof possibleAuthor === 'object') {
    return `${ possibleAuthor.name }${ possibleAuthor.email ? ' <a href="mailto:' + possibleAuthor.email + '">' + possibleAuthor.email + '</a>' : '' }`
  }

  return possibleAuthor
}
