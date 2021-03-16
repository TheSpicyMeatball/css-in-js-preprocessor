[![Build Status](https://travis-ci.com/TheSpicyMeatball/css-in-js-preprocessor.svg?branch=master)](https://travis-ci.com/TheSpicyMeatball/css-in-js-preprocessor)
[![Coverage Status](https://coveralls.io/repos/github/TheSpicyMeatball/css-in-js-preprocessor/badge.svg?branch=master)](https://coveralls.io/github/TheSpicyMeatball/css-in-js-preprocessor?branch=master)
[![dependencies Status](https://status.david-dm.org/gh/TheSpicyMeatball/css-in-js-preprocessor.svg)](https://david-dm.org/TheSpicyMeatball/css-in-js-preprocessor)
[![npm version](https://badge.fury.io/js/css-in-js-preprocessor.svg)](https://badge.fury.io/js/css-in-js-preprocessor)

# css-in-js-preprocessor

> Preprocess your css-in-js files to replace references to design system tokens with actual values

<p>Hello friend.</p>
<p>CSS-in-JS is awesome and powerful, but do you miss the ability to preprocess your styles with your token values (like .less &amp; .sass) without having to have your tokens as a dependency?</p>
<p>Well, that's where <code>css-in-js-preprocessor</code> is here to save the day!</p>
<p>With <code>css-in-js-preprocessor</code>, you can use your design system tokens to build your styles while also <i>auto-MAGICALLY</i> replacing the references to them with the actual values! Thus, eliminating the need for a dependency on a tokens package and ensuring that your values are up to date on every compile.</p>

<p><b>Version:</b> 0.0.2</p>


  

<h2>preprocessor</h2>
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
import { preprocessor } from 'css-in-js-preprocessor';
```

  <h3>Examples</h3>



<h5>Note</h5>

<p>These examples overwrite the original files. I recommend that you preprocess your compiled files as part of your compile process so that you always have reference tot he tokens is source. That way if the token value ever changes, the values in your js styles will be updated with the next compile.</p>

<h4>Basic Example</h4>

<h5>my-tokens.json</h5>

```
{
  "backgroundAccentColor": "#ccc",
  "fontSizeMedium": 12,
  "paddingMedium": 16
}
```

<h5>styles.js</h5>

```
import tokens from './my-tokens';

export const someStyle = {
  backgroundColor: tokens.backgroundAccentColor,
  fontSize: tokens.fontSizeMedium,
  padding: tokens.paddingMedium,
};
```

<h5>style-preprocess.js</h5>
<blockquote>This file should be executed at the end of your compile process.</blockquote>

```
const { preprocessor } = require('css-in-js-preprocessor');
const fs = require('fs');
const path = require('path');
const tokens = require('./my-tokens');

// Setup preprocessor:
const preprocess = preprocessor(tokens, './my-tokens');

// Read the file:
let file = fs.readFileSync('./styles.js', 'utf8');

// Preprocess the file:
file = preprocess(file);

// Save the file:
// Note that this example overwrites the original file which 
// should be the compiled version of the file and not the 
// original source file. 
fs.writeFileSync(path.join('./styles.js'), file, 'utf8');
```

<h5>styles.js</h5>
<blockquote>This is the updated version after the preprocessor has run.</blockquote>

```
export const someStyle = {
  backgroundColor: '#fff',
  fontSize: 12,
  padding: 16,
};
```

<h4>Custom Preprocessors</h4>

<p>If you have additional preprocessing work that you'd like to do, you can pass in an array of functions that take in the preprocessed file where you can do your additional work and return the new string version of the file:</p>

<h5>style-preprocess.js</h5>
<blockquote>This file should be executed at the end of your compile process.</blockquote>
<p>Modify the above example with this:</p>

```
const changePaddingToMargin = file => file.replace('padding: ', 'margin: ');

// Setup preprocessor:
const preprocess = preprocessor(tokens, './my-tokens', [changePaddingToMargin]);
```

<h5>styles.js</h5>
<blockquote>This is the updated version after the preprocessor has run.</blockquote>

```
export const something = {
  backgroundColor: '#fff,
  fontSize: 12,
  margin: 16,
};
```

<h4>Multiple Files</h4>

<p><code>preprocessor</code> conveniently returns a function so you can setup your base preprocessor one time and loop through the files you want to preprocess:</p>

```
const { preprocessor } = require('css-in-js-preprocessor');
const fs = require('fs');
const path = require('path');
const tokens = require('./my-tokens');

// Setup preprocessor:
const preprocess = preprocessor(tokens, './my-tokens');

const files = (fs.readdirsync(pathToDir) || []).filter(file => file.endsWith('.js'));

for (const fileName of files) {
  // Read the file:
  let file = fs.readFileSync(path.join(pathToDir, fileName), 'utf8');

  // Preprocess the file:
  file = preprocess(file);

  // Save the file:
  // Note that this example overwrites the original files which 
  // should be the compiled versions of the files and not the 
  // original source files. 
  fs.writeFileSync(path.join(pathToDir, fileName), file, 'utf8');
}
```

<h4>Imports</h4>

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
      └───index.d.ts - 48 Bytes
      └───index.js - 289 Bytes
    └───/preprocessor
      └───index.d.ts - 662 Bytes
      └───index.js - 1.27 KB
    └───/_private
      └───preprocessTokens - 2.16 KB
      └───removeImport - 1.23 KB
      └───utils - 1.16 KB
  └───/es6
      └───index.d.ts - 48 Bytes
      └───index.js - 48 Bytes
    └───/preprocessor
      └───index.d.ts - 662 Bytes
      └───index.js - 1.1 KB
    └───/_private
      └───preprocessTokens - 1.98 KB
      └───removeImport - 1.08 KB
      └───utils - 942 Bytes
```

<a href="#license"></a>
<h2>License</h2>

MIT