import Image from 'next/image';
import React from 'react';
import BrazilImage from '@/assets/images/Brasil-Icon.png';
import EnglishImage from '@/assets/images/UK-Icon.png';
import { LANGUAGE_ENUM, LANGUAGE_TEXT_ENUM } from '@/helper/enums/LanguageEnum';
import changeAllLanguage from '@/helper/methods/translate/changeAllLanguage';
import { useTranslation } from 'react-i18next';
import useMedia from '@/hooks/useMedia';

interface ButtonProps {
  defaultLanguage: string | null | undefined;
}

function ButtonChangeLanguage({ defaultLanguage }: ButtonProps) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = React.useState<string>(
    defaultLanguage ? defaultLanguage : i18n.language
  );
  const [showOptionsLanguage, setShowOptionsLanguage] =
    React.useState<boolean>(false);
  const mobile = useMedia('(max-width: 769px)');
  const desktop = useMedia('(min-width: 769px)');

  function handleChangeLanguageFirstStep() {
    setShowOptionsLanguage(!showOptionsLanguage);
  }

  function changeLanguageMethod() {
    const currentLanguage = defaultLanguage ? defaultLanguage : i18n.language;
    changeAllLanguage(currentLanguage);
  }

  function handleChangeLanguageSecondStep(language: string) {
    changeAllLanguage(language);
    setShowOptionsLanguage(false);
    setLanguage(language);
  }

  // criou o componente ele altera todo o idioma de acordo com o idioma default passado
  React.useEffect(() => {
    changeLanguageMethod();
  }, []);

  return (
    // button default que começa com a language PT default
    <div className="max-w-max grid absolute top-4 right-4 z-50">
      <button
        className="justify-self-end"
        onClick={handleChangeLanguageFirstStep}
      >
        {language === LANGUAGE_TEXT_ENUM.PT && (
          <div className="flex items-center gap-1 p-2  rounded-lg bg-white font-roboto uppercase text-sm w-[160px] tracking-default text-primary">
            <Image src={BrazilImage} alt="Brazil" />
            Português / BR
          </div>
        )}
        {language === LANGUAGE_TEXT_ENUM.EN && (
          <div className="flex justify-center items-center gap-1 p-2 rounded-lg  bg-white font-roboto uppercase text-sm w-[160px] tracking-default text-[#0e21ce]">
            <Image src={EnglishImage} alt="Brazil" />
            English
          </div>
        )}
      </button>
      {showOptionsLanguage && (
        <ul className="bg-dark p-2 pl-4 mt-2 grid gap-4 rounded-lg w-[200px]">
          <li
            onClick={() =>
              handleChangeLanguageSecondStep(LANGUAGE_TEXT_ENUM.EN)
            }
            className="font-roboto text-sm text-white tracking-default cursor-pointer pt-2 pb-2 text-start"
          >
            English
          </li>
          <li
            onClick={() =>
              handleChangeLanguageSecondStep(LANGUAGE_TEXT_ENUM.PT)
            }
            className="font-roboto text-sm text-white tracking-default cursor-pointer pt-2 pb-2 text-start"
          >
            Português
          </li>
        </ul>
      )}
    </div>
  );
}

export default ButtonChangeLanguage;
