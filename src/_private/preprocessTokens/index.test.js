/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { preprocessTokens } = require('../../../dist/lib/es5/_private/preprocessTokens');

describe('preprocessTokens', () => {
  const tokenImport = './my-tokens';
  const tokens = {
    backgroundColor: '#fff',
    fontSize: 12,
    padding: 16,
  };

  const file = `import x from './my-tokens';
  export const something = {
    backgroundColor: x.backgroundColor,
    fontSize: x.fontSize,
    padding: x.padding,
  };`;

  const fileRequire = `const x = require('./my-tokens');
  export const something = {
    backgroundColor: x.backgroundColor,
    fontSize: x.fontSize,
    padding: x.padding,
  };`;

  const fileMissingTokenImport = `  export const something = {
    backgroundColor: x.backgroundColor,
    fontSize: x.fontSize,
    padding: x.padding,
  };`;

  test('basic', () => {
    expect(preprocessTokens(file, tokens, tokenImport)).toBe(`import x from './my-tokens';
  export const something = {
    backgroundColor: '#fff',
    fontSize: 12,
    padding: 16,
  };`);
  });

  test('require', () => {
    expect(preprocessTokens(fileRequire, tokens, tokenImport)).toBe(`const x = require('./my-tokens');
  export const something = {
    backgroundColor: '#fff',
    fontSize: 12,
    padding: 16,
  };`);
  });

  test('missing token import', () => {
    expect(preprocessTokens(fileMissingTokenImport, tokens, tokenImport)).toBe(`  export const something = {
    backgroundColor: x.backgroundColor,
    fontSize: x.fontSize,
    padding: x.padding,
  };`);
  });

  test('empty', () => {
    expect(preprocessTokens(undefined, tokens, tokenImport)).toBe('');
    expect(preprocessTokens(null, tokens, tokenImport)).toBe('');
    expect(preprocessTokens('', tokens, tokenImport)).toBe('');
    expect(preprocessTokens('empty tokens', tokens, undefined)).toBe('empty tokens');
    expect(preprocessTokens('empty tokens', tokens, null)).toBe('empty tokens');
    expect(preprocessTokens('empty tokens', tokens, {})).toBe('empty tokens');
  });
});