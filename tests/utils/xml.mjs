import { JSDOM } from "jsdom"

// Cf. https://github.com/jsdom/jsdom/blob/main/lib/jsdom/living/domparsing/DOMParser-impl.js
// cf. https://stackoverflow.com/questions/59668971/save-xml-parsed-by-jsdom-as-a-file
// cf. https://stackoverflow.com/questions/42649700/using-domparser-in-javascript-testing-with-mocha-and-jsdom

export const DOMParser = new JSDOM().window.DOMParser

export const XMLSerializer = new JSDOM().window.XMLSerializer