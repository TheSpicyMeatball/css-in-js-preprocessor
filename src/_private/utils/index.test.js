/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { isNotNullOrEmpty, isNullOrEmpty } = require('../../../dist/lib/es5/_private/utils');

describe('isNullOrEmpty', () => {
  test('empty', () => {
    expect(isNullOrEmpty(null)).toBe(true);
    expect(isNullOrEmpty(undefined)).toBe(true);
    expect(isNullOrEmpty('')).toBe(true);
    expect(isNullOrEmpty([])).toBe(true);
    expect(isNullOrEmpty({})).toBe(true);
  });

  test('not empty', () => {
    expect(isNullOrEmpty('text')).toBe(false);
    expect(isNullOrEmpty(['text'])).toBe(false);
    expect(isNullOrEmpty({ a: 'text' })).toBe(false);
  });
});

describe('isNotNullOrEmpty', () => {
  test('empty', () => {
    expect(isNotNullOrEmpty(null)).toBe(false);
    expect(isNotNullOrEmpty(undefined)).toBe(false);
    expect(isNotNullOrEmpty('')).toBe(false);
    expect(isNotNullOrEmpty([])).toBe(false);
    expect(isNotNullOrEmpty({})).toBe(false);
  });

  test('not empty', () => {
    expect(isNotNullOrEmpty('text')).toBe(true);
    expect(isNotNullOrEmpty(['text'])).toBe(true);
    expect(isNotNullOrEmpty({ a: 'text' })).toBe(true);
  });
});