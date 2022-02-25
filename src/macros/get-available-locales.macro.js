const { createMacro } = require("babel-plugin-macros");
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = createMacro(getAvailableLocaleMacro);

function valueToASTNode(value, babel) {
  const fileNode = babel.parse(`var x = ${JSON.stringify(value)}`);
  return fileNode.program.body[0].declarations[0].init;
}

function getAvailableLocaleMacro({ references, babel }) {
  references.default.forEach((referencePath) => {
    const quasiPath = referencePath.parentPath.get("quasi");

    const path = join(__dirname, "../locales");

    const getDirectories = (source) =>
      readdirSync(source, { withFileTypes: true })
        .filter(
          (dirent) =>
            dirent.isDirectory() && !dirent.name.startsWith("_") && !dirent.name.startsWith("."),
        )
        .map((dirent) => dirent.name);

    const value = getDirectories(path);
    const valueNode = valueToASTNode(value, babel);

    quasiPath.parentPath.replaceWith(valueNode);
  });
}
