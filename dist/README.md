[![Build Status](https://travis-ci.com/TheSpicyMeatball/css-in-js-preprocessor.svg?branch=main)](https://travis-ci.com/TheSpicyMeatball/css-in-js-preprocessor)
[![Coverage Status](https://coveralls.io/repos/github/TheSpicyMeatball/css-in-js-preprocessor/badge.svg?branch=main)](https://coveralls.io/github/TheSpicyMeatball/css-in-js-preprocessor?branch=main)
[![dependencies Status](https://status.david-dm.org/gh/TheSpicyMeatball/css-in-js-preprocessor.svg)](https://david-dm.org/TheSpicyMeatball/css-in-js-preprocessor)
[![npm version](https://badge.fury.io/js/css-in-js-preprocessor.svg)](https://badge.fury.io/js/css-in-js-preprocessor)

# css-in-js-preprocessor

> Preprocess your css-in-js files to replace references to design system tokens with actual values

<p>Hello friend.</p>
<p>CSS-in-JS is awesome and powerful, but do you miss the ability to preprocess your styles with your token values (like .less &amp; .sass) without having to have your tokens as a dependency?</p>
<p>Well, that's where <code>css-in-js-preprocessor</code> is here to save the day!</p>
<p>With <code>css-in-js-preprocessor</code>, you can use your design system tokens to build your styles while also <i>auto-MAGICALLY</i> replacing the references to them with the actual values! Thus, eliminating the need for a dependency on a tokens package and ensuring that your values are up to date on every compile.</p>

<p><b>Version:</b> 0.0.1</p>


  

<h2>preprocess</h2>
<p>Preprocesses your css-in-js file by replacing references to design system tokens with actual values</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>file</b></p>The string contents of the file</td><td>string</td></tr><tr><td><p><b>tokens</b></p>Object containing the key/value pairs representing the token/value</td><td>Record&lt;string, unknown&gt;</td></tr><tr><td><p><b>tokenImport</b></p>The string path of the package or file imported</td><td>string</td></tr><tr><td><p><b>custom</b></p>Array of custom processors</td><td>Array&lt;(file: string) =&gt; string&gt;</td></tr></tbody>
    </table><p><b>Returns:</b> {(file: string) =&gt; string}</p>
  <h3>Import</h3>

```
import { preprocess } from 'css-in-js-preprocessor';
```

  <h3>Examples</h3>



```
// my-tokens.json
{
  "backgroundColor": "#fff",
  "fontSize": 12,
  "padding": 16
}
```

```
const file = `
import tokens from './my-tokens';

export const something = {
  backgroundColor: tokens.backgroundColor,
  fontSize: tokens.fontSize,
  padding: tokens.padding,
};`;

const preprocessor = preprocess(tokens, './my-tokens');
preprocessor(file);

// outputs =>
`
export const something = {
  backgroundColor: '#fff',
  fontSize: 12,
  padding: 16,
};`
```

<h3>Imports</h3>

For your token imports, you may use: 

* default import
* named import
* default require
* named require

You may also name your tokens anything you wish:

```
import tokens from './my-tokens';
import { myTokens } from './my-tokens';
const tokenObj = require('./my-tokens');
const { tokenzzz } = require('./my-tokens');
```

<code>css-in-js-preprocessor</code> will pick up the name of your tokens object and get to work. 

<h3>Multiple Files</h3>

<p><code>preprocess</code> conveniently returns a function so you can setup your base preprocessor one time and loop through the files you want to preprocess:</p>

```
const fs = require('fs');
const path = require('path');
const tokens = require('./my-tokens');

// Setup preprocessor:
const preprocessor = preprocess(tokens, './my-tokens');

const files = fs.readdirsync(pathToDir);

for (const fileName of files) {
  // Read the file:
  let file = fs.readFileSync(path.join(pathToDir, fileName), 'utf8');

  // Preprocess the file:
  file = preprocessor(file);

  // Save the file:
  fs.writeFileSync(path.join(pathToDir, fileName), file, 'utf8');
}
```

<h3>Custom Preprocessors</h3>

<p>If you have additional preprocessing work that you'd like to do, you can pass in an array of functions that take in the preprocessed file where you can do your additional work and return the new string version of the file:</p>

```
const file = `
import tokens from './my-tokens';

export const something = {
  backgroundColor: tokens.backgroundColor,
  fontSize: tokens.fontSize,
  padding: tokens.padding,
};`;

const changePaddingToMargin = file => file.replace('padding: ', 'margin: ');

const preprocessor = preprocess(tokens, './my-tokens', [changePaddingToMargin]);
preprocessor(file);

// outputs =>
`
export const something = {
  backgroundColor: '#fff,
  fontSize: 12,
  margin: 16,
};`
```



<hr />


<a href="#package-contents"></a>
<h2>Package Contents</h2>

Within the module you'll find the following directories and files:

```html
package.json
CHANGELOG.md -- history of changes to the module
LICENSE
README.md -- this file
/lib
  └───/es5
      └───index.d.ts - 44 Bytes
      └───index.js - 277 Bytes
    └───/preprocess
      └───index.d.ts - 660 Bytes
      └───index.js - 1.26 KB
    └───/_private
      └───preprocessTokens - 2.16 KB
      └───removeImport - 1.23 KB
      └───utils - 1.16 KB
  └───/es6
      └───index.d.ts - 44 Bytes
      └───index.js - 44 Bytes
    └───/preprocess
      └───index.d.ts - 660 Bytes
      └───index.js - 1.1 KB
    └───/_private
      └───preprocessTokens - 1.98 KB
      └───removeImport - 1.08 KB
      └───utils - 942 Bytes
```

<a href="#license"></a>
<h2>License</h2>

MIT