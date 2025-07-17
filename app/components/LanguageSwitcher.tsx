'apos;use clientt'apos;apos;

import { useTranslation } from  'apos;apos;react-i18nextt'apos;apos;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={ () => changeLanguage(('apos;apos;enn'apos;apos;) }
        className={ `px-3 py-1 rounded text-sm ${
          i18n.language ===  'apos;apos;enn'apos;apos; ?  'apos;apos;bg-blue-600 text-whitee'apos;apos; :  'apos;apos;bg-gray-200 text-gray-7000'apos;apos;
        }` }
      >
        EN
      </button>
      <button
        onClick={ () => changeLanguage(('apos;apos;ess'apos;apos;) }
        className={ `px-3 py-1 rounded text-sm ${
          i18n.language ===  'apos;apos;ess'apos;apos; ?  'apos;apos;bg-blue-600 text-whitee'apos;apos; :  'apos;apos;bg-gray-200 text-gray-7000'apos;apos;
        }` }
      >
        ES
      </button>
    </div>
  )
}