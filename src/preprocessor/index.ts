import { preprocessTokens } from '../_private/preprocessTokens';
import { removeImport } from '../_private/removeImport';
import { isNotNullOrEmpty } from '../_private/utils';

/**
 * Preprocesses your css-in-js file by replacing references to design system tokens with actual values
 * 
 * @since v1.0.0
 * @param {string} file The string contents of the file
 * @param {Record<string, unknown>} tokens Object containing the key/value pairs representing the token/value
 * @param {string} tokensImport The string path of the package or file imported for the tokens
 * @param {Array<(file: string) => string>} custom Array of custom processors
 * @returns {(file: string) => string}
 */
export const preprocessor = (tokens: Record<string, unknown>, tokensImport: string, custom?: Array<(file: string) => string>) => (file: string) : string => {
  file = preprocessTokens(file, tokens, tokensImport);
  file = removeImport(file, tokensImport);

  if (isNotNullOrEmpty(custom)) {
    for (const customProcessor of custom) {
      file = customProcessor(file);
    }
  }

  return file;
};