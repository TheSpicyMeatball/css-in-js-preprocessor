import { isNullOrEmpty } from '../utils';

/**
 * Removes the import statement of the tokens
 *
 * @param {string} file The string contents of the file
 * @param {string} tokenImport The string path of the package or file imported
 * @returns {string}
 */
export const removeImport = (file: string, tokenImport: string) : string => {
  if (isNullOrEmpty(file)) return '';
  if (isNullOrEmpty(tokenImport)) return file;

  const regexImport = new RegExp(`import \\{? *(.*?) *\\}? from ('|")${tokenImport}('|");? *(\\r\\n|\\r|\\n)?`, 'gm');
  const regexRequire = new RegExp(`const \\{? *(.*?) *\\}? = require\\(('|")${tokenImport}('|")\\);? *(\\r\\n|\\r|\\n)?`, 'gm');

  file = file.replace(regexImport, '');
  file = file.replace(regexRequire, '');

  return file;
};