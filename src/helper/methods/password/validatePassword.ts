import {
  findCapitalLetter,
  findMinisculeLetter,
  findNumber,
  findSpecialsCharacters,
} from '@/helper/regexp/regexp';
import i18n from '@/i18n/i18n';

export function validatePassword(value: string) {
  const caractereEspecial = findSpecialsCharacters;
  const number = findNumber;
  const uppercase = findCapitalLetter;
  const lowercase = findMinisculeLetter;

  if (value.length < 6) {
    return i18n.t('password_rule_5');
  } else if (!caractereEspecial.test(value)) {
    return i18n.t('password_rule_4');
  } else if (!number.test(value)) {
    return i18n.t('password_rule_3');
  } else if (!uppercase.test(value)) {
    return i18n.t('password_rule_1');
  } else if (!lowercase.test(value)) {
    return i18n.t('password_rule_2');
  }

  return true; // A senha é válida
}
