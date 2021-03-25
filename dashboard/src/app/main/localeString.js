import i18next from 'i18next';

function localeString(object) {
  return (object || {})[i18next.language];
}

export default localeString;
