/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { preprocess } = require('../../dist/lib/es5/preprocess');

describe('preprocess', () => {
  const tokenImport = './my-tokens';
  const tokens = {
    backgroundColor: '#fff',
    fontSize: 12,
    padding: 16,
  };

  const tokensDoubleQuote = {
    backgroundColor: "#fff",
    fontSize: 12,
    padding: 16,
  };

  const file = `import x from './my-tokens';
  export const something = {
    backgroundColor: x.backgroundColor,
    fontSize: x.fontSize,
    padding: x.padding,
  };`;

  const fileDestructure = `import { x } from './my-tokens';
  export const something = {
    backgroundColor: x.backgroundColor,
    fontSize: x.fontSize,
    padding: x.padding,
  };`;

  test('basic', () => {
    const preprocessor = preprocess(tokens, tokenImport);
    expect(preprocessor(file)).toBe(`  export const something = {
    backgroundColor: '#fff',
    fontSize: 12,
    padding: 16,
  };`);
  });

  test('destructure', () => {
    const preprocessor = preprocess(tokens, tokenImport);
    expect(preprocessor(fileDestructure)).toBe(`  export const something = {
    backgroundColor: '#fff',
    fontSize: 12,
    padding: 16,
  };`);
  });

  test('double quote', () => {
    const preprocessor = preprocess(tokensDoubleQuote, tokenImport);
    expect(preprocessor(file)).toBe(`  export const something = {
    backgroundColor: '#fff',
    fontSize: 12,
    padding: 16,
  };`);
  });

  test('custom', () => {
    const custom1 = file => file.replace('fontSize: 12,', 'fontSize: 17,');
    const custom2 = file => file.replace('padding: 16,', 'margin: 16,');

    const preprocessor = preprocess(tokens, tokenImport, [custom1, custom2]);

    expect(preprocessor(file)).toBe(`  export const something = {
    backgroundColor: '#fff',
    fontSize: 17,
    margin: 16,
  };`);
  });
});