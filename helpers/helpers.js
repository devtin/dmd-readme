function examples (options) {
  if (this.examples) {
    return this.examples.reduce(function (prev, example) {
      var lines = example.split(/\r\n|\r|\n/)

      /* Process @lang */
      var exampleLangOptions = ddata.option('example-lang', options)
      var matches = lines[0].match(/@lang\s+(\w+)\s*/)
      if (matches) {
        var exampleLangSubtag = matches[1]
        lines[0] = lines[0].replace(matches[0], '')
        if (lines[0].length === 0) {
          lines.splice(0, 1)
        }
      }
      var exampleLang = exampleLangSubtag || exampleLangOptions

      /* Process <caption> and update example */
      matches = lines[0].match(/\s*<caption>(.*?)<\/caption>\s*/)
      var caption
      if (matches) {
        caption = matches[1]
        example = lines.slice(1).join('\n')
      } else if (exampleLangSubtag) {
        example = lines.join('\n')
      }

      if (!(/```/.test(example) || exampleLang === 'off')) {
        example = util.format('```%s%s```', exampleLang ? exampleLang + '\n' : '', example ? example + '\n' : '')
      }

      return prev + options.fn({caption: caption, example: example})
    }, '')
  }
}

module.exports = {
  examples
}
