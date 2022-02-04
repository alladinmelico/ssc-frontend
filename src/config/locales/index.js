const locales = [
  {
    locale: 'en',
    messages: import('./en'),
    //loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/en`),
  },
  {
    locale: 'ru',
    messages: import('./ru'),
    //loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/ru`),
  },
  {
    locale: 'de',
    messages: import('./de'),
    //loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/de`),
  },
  {
    locale: 'fil',
    messages: import('./fil'),
    //loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/fil`),
  },
]

export default locales
