<div><h1>dmd-readme</h1></div>

<p>
    <a href="https://www.npmjs.com/package/dmd-readme" target="_blank"><img src="https://img.shields.io/npm/v/dmd-readme.svg" alt="Version"></a>
<a href="https://github.com/devtin/dmd-readme/actions?query=workflow%3Atest"><img src="https://github.com/devtin/dmd-readme/workflows/test/badge.svg"></a>
<a href="http://opensource.org/licenses" target="_blank"><img src="http://img.shields.io/badge/License-MIT-brightgreen.svg"></a>
</p>

<p>
    A plugin for clean readme docs
</p>

## Installation

```sh
$ npm i dmd-readme --save
# or
$ yarn add dmd-readme
```



<br><a name="Usage"></a>

### Usage
**Description:**

Pass the plug-in name to `jsdoc2md` or `dmd`:```jsdoc2md --plugin dmd-readme```This plugin is initially a fork from dmd-readable, which:- removes global indexes- places descriptions in block-quotes- adds more whitespace before headings- changes the delimiter for multiple types in param tables to a comma- adds alias output


<br><a name="config"></a>

### config(path) ⇒ <code>\*</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The config path |

**Description:**

Grabs configuration options


<br><a name="features"></a>

### features()
**Description:**

Loads AVA test files located `config.features`


<br><a name="pkg"></a>

### pkg(key) ⇒ <code>\*</code>
**See**: [docs.hbs](docs.hbs) for an example of how to use this function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The package property you want returned |

**Description:**

Reads info from the package.json file.


<br><a name="prefixLines"></a>

### prefixLines(string, replacer) ⇒ <code>string</code>

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to modify |
| replacer | <code>string</code> | The string to prefix to each line |

**Description:**

Prefixes a string to the beginning of each line in the first string


<br><a name="stripJsdocComment"></a>

### stripJsdocComment(jsDocCommentBlock, replaceValue) ⇒ <code>String</code>

| Param | Type | Description |
| --- | --- | --- |
| jsDocCommentBlock | <code>String</code> |  |
| replaceValue | <code>String</code> | Value with to replace comment blocks |

**Returns**: <code>String</code> - The comment without the asterisks  
**Description:**

Removes all asterisks and additional white spaces from JSDoc comments

**Example**  
```js
const jsDocSyntax = `/**
 * A JSDoc description
 *
 * Hello
 **\/`

 // => Outputs:
 // A JSDoc description
 //
 // Hello
```

<br><a name="jsCodeToMd"></a>

### jsCodeToMd(jsCode) ⇒ <code>string</code>

| Param | Type |
| --- | --- |
| jsCode | <code>String</code> | 

**Description:**

Converts given `jsCode` into markdown by stripping jsDoc comments


* * *

### License

[MIT](https://opensource.org/licenses/MIT)

&copy; 2020-present Martin Rafael Gonzalez <a href="mailto:tin@devtin.io">tin@devtin.io</a>
