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