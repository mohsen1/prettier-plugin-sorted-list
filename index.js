/**
 * @param {string} code
 * @param {import('prettier').RequiredOptions} options
 */
function preprocess(code, _options) {
  const LINE_SEPARATOR = "\n";
  const lines = code.split(LINE_SEPARATOR);
  const sortedLines = [];
  let currentLineIndex = 0;

  while (currentLineIndex < lines.length) {
    const line = lines[currentLineIndex];
    // is this a line with a directive comment for this plugin?
    if (!isLineDirectiveComment(line)) {
      sortedLines.push(line);
      currentLineIndex++;
      continue;
    }

    // Start with current line as start index
    let listStartIndex = currentLineIndex;

    // Progress currentLineIndex until we see the first line that is a string literal
    // this helps us skip over lines that should not be sorted such as additional comments and
    // whitespace
    while (
      listStartIndex < lines.length &&
      !isLineStringLiteral(lines[listStartIndex])
    ) {
      sortedLines.push(lines[listStartIndex]);
      listStartIndex++;
    }

    // last line is a line that is not starting with a string literal ("string" or 'string')
    let listEndIndex = listStartIndex;
    // now we progress currentLineIndex until we see the first line that is not a string literal
    while (
      listEndIndex < lines.length &&
      isLineStringLiteral(lines[listEndIndex])
    ) {
      listEndIndex++;
    }

    // now we have the start and end of the list, we can sort it
    const listLines = lines.slice(listStartIndex, listEndIndex);

    // Sort lines alphabetically. In future we can add options to sort in different ways.
    listLines.sort();

    sortedLines.push(...listLines);

    // Progress currentLineIndex to the end of the list
    currentLineIndex = listEndIndex;
  }

  return sortedLines.join(LINE_SEPARATOR);
}

/**
 * This function determines if a line is a comment directive. It works for both line comments and block comments.
 *
 * Line comment examples:
 * // prettier-sorted-list
 * // prettier-sorted-list Sorted list
 *   // prettier-sorted-list
 *
 * Block comment examples:
 * /* prettier-sorted-list * /
 * /* prettier-sorted-list Sorted list * /
 * /*  prettier-sorted-list  * /
 *
 * @param {string} line - The line of code to check.
 * @return {boolean} - True if the line is a comment directive; false otherwise.
 */
function isLineDirectiveComment(line) {
  const lineCommentRegex = /\/\/\s*prettier-sorted-list\s*(.*)/;
  const blockCommentRegex = /\/\*\s*prettier-sorted-list(.*?)\*\//;

  return lineCommentRegex.test(line) || blockCommentRegex.test(line);
}

/**
 * Determines if a line is a string literal.
 * Example
 * "string"
 * 'string'
 * "string" + "string"
 * 'string' + 'string'
 * 'string' // comment
 * @param {string} line
 * @returns {boolean}
 */
function isLineStringLiteral(line) {
  return line.trim().startsWith('"') || line.trim().startsWith("'");
}

module.exports = {
  languages: [
    {
      name: "JavaScript",
      parsers: ["babel"],
      extensions: [".js", ".jsx"],
      vscodeLanguageIds: ["javascript"],
    },
    {
      name: "TypeScript",
      parsers: ["typescript"],
      extensions: [".ts", ".tsx"],
      vscodeLanguageIds: ["typescript"],
    },
  ],
  parsers: {
    babel: {
      ...require("prettier/parser-babel").parsers.babel,
      preprocess,
    },
    typescript: {
      ...require("prettier/parser-typescript").parsers.typescript,
      preprocess,
    },
  },
};
