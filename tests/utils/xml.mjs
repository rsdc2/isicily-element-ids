import { JSDOM } from "jsdom"

export const DOMParser = new JSDOM().window.DOMParser

