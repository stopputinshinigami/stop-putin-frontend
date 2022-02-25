const { createMacro } = require("babel-plugin-macros");
const { readdirSync } = require("fs");
const { join } = require("path");
const { keys } = require("ramda");

const AVAILABLE_LANGUAGES = readdirSync(join(__dirname, "../locales"), {
  withFileTypes: true,
})
  .filter(
    (dirent) =>
      dirent.isDirectory() &&
      !dirent.name.startsWith("_") &&
      !dirent.name.startsWith(".")
  )
  .map((dirent) => dirent.name);

const valueToASTNode = (value, babel) => {
  const fileNode = babel.parse(`var x = ${JSON.stringify(value)}`);
  return fileNode.program.body[0].declarations[0].init;
};

const getParentLocalesFromCLDR = () => {
  console.info("[Suplery macro][getParentLocalesFromCLDR] loading...");
  const result = require(`cldr-core/supplemental/parentLocales.json`)
    .supplemental.parentLocales.parentLocale;

  console.info("[Suplery macro][getParentLocalesFromCLDR] done.");
  return result;
};

const getCountriesFromCLDR = () => {
  const result = AVAILABLE_LANGUAGES.reduce((acc, language) => {
    console.info("[Suplery macro][getCountriesFromCLDR] loading:", language);

    const territories =
      require(`cldr-localenames-full/main/${language}/territories.json`).main[
        language
      ].localeDisplayNames.territories;
    const territoriesCodes = keys(territories);

    return {
      ...acc,
      [language]: territoriesCodes.reduce((acc, code) => {
        return {
          ...acc,
          [code]: {
            code,
            name: territories[code],
          },
        };
      }, {}),
    };
  }, {});

  console.info("[Suplery macro][getCountriesFromCLDR] done.");
  return result;
};

const getLanguagesFromCLDR = () => {
  const result = AVAILABLE_LANGUAGES.reduce((acc, language) => {
    console.info("[Suplery macro][getLanguagesFromCLDR] loading:", language);
    const languagesNames =
      require(`cldr-localenames-full/main/${language}/languages.json`).main[
        language
      ].localeDisplayNames.languages;

    const languagesCodes = keys(languagesNames);

    return {
      ...acc,
      [language]: languagesCodes.reduce((acc, code) => {
        return {
          ...acc,
          [code]: {
            code,
            name: languagesNames[code],
          },
        };
      }, {}),
    };
  }, {});

  console.info("[Suplery macro][getLanguagesFromCLDR] done.");
  return result;
};

const getCLDRMacro = ({ references, babel }) => {
  references.getParentLocales &&
    references.getParentLocales.forEach((referencePath) => {
      const quasiPath = referencePath.parentPath.get("quasi");
      quasiPath.parentPath.replaceWith(
        valueToASTNode(getParentLocalesFromCLDR(), babel)
      );
    });

  references.getCountries &&
    references.getCountries.forEach((referencePath) => {
      const quasiPath = referencePath.parentPath.get("quasi");
      quasiPath.parentPath.replaceWith(
        valueToASTNode(getCountriesFromCLDR(), babel)
      );
    });

  references.getLanguages &&
    references.getLanguages.forEach((referencePath) => {
      const quasiPath = referencePath.parentPath.get("quasi");
      quasiPath.parentPath.replaceWith(
        valueToASTNode(getLanguagesFromCLDR(), babel)
      );
    });
};

module.exports = createMacro(getCLDRMacro);

module.exports.getParentLocales = () => {};
module.exports.getCountries = () => {};
module.exports.getWeekDayOrder = () => {};
module.exports.getLanguages = () => {};
module.exports.getCurrenciesAdditionalInformation = () => {};
module.exports.getPeriodOfDays = () => {};
module.exports.getGeneratedKeys = () => {};
