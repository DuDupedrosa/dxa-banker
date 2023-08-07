import { http } from '@/app/api/http';
import i18n from '@/i18n/i18n';

async function changeAllLanguage(language: string) {
  await http
    .get(`translation/general-fields/${language}`, {})
    .then((response) => {
      let buff = Buffer.from(response.data.message, 'base64');
      i18n.addResourceBundle(
        language,
        'translation',
        JSON.parse(buff.toString()),
        true,
        true
      );
      i18n.changeLanguage(language);
    })
    .catch((err) => {});
  localStorage.removeItem('lang');
  localStorage.setItem('lang', language);
}

export default changeAllLanguage;
