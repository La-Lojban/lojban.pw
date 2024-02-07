// Define the mapping between language codes and URLs
const languageMapping = ["ru", "pt", "es", "fr"];

// Get the browser's language
const userLanguage = (navigator.language || navigator.userLanguage).replace(/-.*/,'').toLowerCase();
let path = document.location.pathname;

// Check if the language is supported and redirect if so
if (languageMapping.includes(userLanguage)) {
  const pathSplit = path.split("/");
  if (!languageMapping.includes(pathSplit[1])) {
    if (["", "/"].includes(path)) path = `${path.replace(/\/$/, "")}/welcome/`;
    window.location.assign(`/${userLanguage}${path}`);
  }
}
