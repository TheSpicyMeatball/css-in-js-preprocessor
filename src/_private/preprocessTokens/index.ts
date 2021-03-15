import { first, isNotNullOrEmpty, isNullOrEmpty } from '../utils';

/**
 * Replaces the token references with the actual values
 *
 * @param {string} file The string contents of the file
 * @param {Record<string, unknown>} tokens Object containing the key/value pairs representing the token/value
 * @param {string} tokenImport The string path of the package or file imported
 * @returns {string}
 */
export const preprocessTokens = (file: string, tokens: Record<string, unknown>, tokenImport: string) : string => {
  if (isNullOrEmpty(file)) return '';
  if (isNullOrEmpty(tokens) || isNullOrEmpty(tokenImport)) return file;

  let t = '';
  const regexImport = new RegExp(`import \\{? *(.*?) *\\}? from ('|")${tokenImport}('|")`, 'gm');
  const regexRequire = new RegExp(`const \\{? *(.*?) *\\}? = require\\(('|")${tokenImport}('|")\\)`, 'gm');

  let matches = first(Array.from(file.matchAll(regexImport)));

  if (isNotNullOrEmpty(matches) && matches.length >= 2) {
    t = matches[1];
  } else {
    matches = first(Array.from(file.matchAll(regexRequire)));

    if (isNotNullOrEmpty(matches) && matches.length >= 2) {
      t = matches[1];
    }
  }

  if (isNullOrEmpty(t)) return file;

  for (const key in tokens) {
    const value = typeof tokens[key] === 'string' ? `'${tokens[key].toString().replace(/'/g, '\\\'')}'` : tokens[key].toString();
    const regex = new RegExp(`${t}\\.${key}(?![a-zA-Z\\d])`, 'gm');
    file = file.replace(regex, value);
  }

  return file;
};