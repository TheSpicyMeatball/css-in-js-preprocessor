/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { removeImport } = require('../../../dist/lib/es5/_private/removeImport');

describe('removeImport', () => {
  const tokenImport = './my-tokens';

  test('import', () => {
    expect(removeImport(`import x from './my-tokens';\n// other stuff...`, tokenImport)).toBe('// other stuff...');
    expect(removeImport(`import {x} from './my-tokens';\n// other stuff...`, tokenImport)).toBe('// other stuff...');
    expect(removeImport(`import { x } from './my-tokens';\n// other stuff...`, tokenImport)).toBe('// other stuff...');
  });
  
  test('require', () => {
    expect(removeImport(`const x = require('./my-tokens');\n// other stuff...`, tokenImport)).toBe('// other stuff...');
    expect(removeImport(`const {x} = require('./my-tokens');\n// other stuff...`, tokenImport)).toBe('// other stuff...');
    expect(removeImport(`const { x } = require('./my-tokens');\n// other stuff...`, tokenImport)).toBe('// other stuff...');
  });

  test('no match', () => {
    expect(removeImport(`import x from './my-tokens';\n// other stuff...`, './doesnt-exist-in-file')).toBe(`import x from './my-tokens';\n// other stuff...`);
  });

  test('empty', () => {
    expect(removeImport(undefined, tokenImport)).toBe('');
    expect(removeImport(null, tokenImport)).toBe('');
    expect(removeImport('', tokenImport)).toBe('');
    expect(removeImport('file', undefined)).toBe('file');
    expect(removeImport('file', null)).toBe('file');
    expect(removeImport('file', '')).toBe('file');
  });
});