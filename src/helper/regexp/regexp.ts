export const regexpToEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const passwordRegex =
  /^(?=.*[!@#$%^&*()\-=_+[\]{};':"\\|,.<>?])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

export const findSpecialsCharacters = /[!@#$%^&*()\-_=+{}[\]:;"'|<>?,.]/;

export const findNumber = /\d/;

export const findCapitalLetter = /[A-Z]/;

export const findMinisculeLetter = /[a-z]/;
