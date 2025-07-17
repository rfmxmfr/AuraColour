'use clientt'apos;

import { useTranslation } from  'apos;react-i18nextt'apos;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={ () => changeLanguage(('apos;enn'apos;) }
        className={ `px-3 py-1 rounded text-sm ${
          i18n.language ===  'apos;enn'apos; ?  'apos;bg-blue-600 text-whitee'apos; :  'apos;bg-gray-200 text-gray-7000'apos;
        }` }
      >
        EN
      </button>
      <button
        onClick={ () => changeLanguage(('apos;ess'apos;) }
        className={ `px-3 py-1 rounded text-sm ${
          i18n.language ===  'apos;ess'apos; ?  'apos;bg-blue-600 text-whitee'apos; :  'apos;bg-gray-200 text-gray-7000'apos;
        }` }
      >
        ES
      </button>
    </div>
  )
}