import { EditorValues } from '../interfaces';
import { readFiddle } from '../utils/read-fiddle';

const { joinPaths } = window.NodeAPI;
const STATIC_DIR =
  process.env.NODE_ENV === 'production'
    ? joinPaths(__dirname, '../../static')
    : joinPaths(process.cwd(), './static');

/**
 * Returns expected content for a given name.
 *
 * @param {string} name
 * @returns {Promise<EditorValues>}
 */
export function getTemplateValues(name: string): Promise<EditorValues> {
  const templatePath = joinPaths(STATIC_DIR, 'show-me', name.toLowerCase());

  return readFiddle(templatePath);
}
