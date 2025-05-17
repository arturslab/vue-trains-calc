// Languages
import en from './en'
import pl from './pl'
import de from './de'
import ua from './ua'
export const defaultLocale = 'pl'
export const languagesList = {
  en: en,
  pl: pl,
  de: de,
  ua: ua
}
export const flagsSvg = {
  en: `<clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#b)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g>`,
  pl: `<path fill="#fff" d="M0 0h16v10H0z"/><path fill="#dc143c" d="M0 5h16v5H0z"/>`,
  de: `<path d="M0 0h5v3H0z"/><path fill="#D00" d="M0 1h5v2H0z"/><path fill="#FFCE00" d="M0 2h5v1H0z"/>`,
  ua: `<path fill="#0057B7" d="M0 0h3v2H0z"/><path fill="gold" d="M0 1h3v1H0z"/>`
}
