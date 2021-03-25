import axios from 'axios';

export function translate(text, locale) {
  return axios.post('admin/translate', { text, locale });
}
