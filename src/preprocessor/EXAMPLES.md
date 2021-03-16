<h5>Note</h5>

<p>These examples overwrite the original files. I recommend that you preprocess your compiled files as part of your compile process so that you always have reference to the tokens in source. That way if the token value ever changes, the values in your js styles will be updated with the next compile. If you are operating on the compiled files, you will want to overwrite the file you're preprocessing with the updated version which is why the examples are shown the way they are.</p>

<p>Here's an example of how you might add it to your compile process. In this case, I'm running a TypeScript compile and then executing a node script that uses <code>css-in-js-preprocessor</code>:</p>

```
"scripts": {
  "compile": "tsc && node bin/style-preprocess.js"
}
```

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
<blockquote>This file should be executed at the end of your compile or build process.</blockquote>

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
<blockquote>This file should be executed at the end of your compile or build process.</blockquote>
<p>Modify the above example with this:</p>

```
const changePaddingToMargin = file => file.replace('padding: ', 'margin: ');
const addTimeStamp = file => `${file}\n\n// Compiled: ${(new Date()).toString()}`;

// Setup preprocessor:
const preprocess = preprocessor(tokens, './my-tokens', [changePaddingToMargin, addTimeStamp]);
```

<h5>styles.js</h5>
<blockquote>This is the updated version after the preprocessor has run.</blockquote>

```
export const something = {
  backgroundColor: '#fff,
  fontSize: 12,
  margin: 16,
};

// Compiled: Tue Mar 16 2021 06:15:06 GMT-0500 (Central Daylight Time)
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